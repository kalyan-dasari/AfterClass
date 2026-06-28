from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, func
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os

SECRET_KEY = "afterclass-super-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 30

SQLALCHEMY_DATABASE_URL = "sqlite:///./afterclass.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Resource(Base):
    __tablename__ = "resources"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    tag = Column(String)
    link = Column(String, default="")
    created_at = Column(DateTime, server_default=func.now())

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    author = Column(String)
    tech = Column(String)
    github = Column(String, default="")
    demo = Column(String, default="")
    created_at = Column(DateTime, server_default=func.now())

class Opportunity(Base):
    __tablename__ = "opportunities"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    type = Column(String)
    location = Column(String)
    extra = Column(String, default="")
    tag = Column(String, default="")
    action = Column(String, default="Apply")
    created_at = Column(DateTime, server_default=func.now())

class Member(Base):
    __tablename__ = "members"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    tag = Column(String, default="")
    quote = Column(Text, default="")
    skills = Column(String)
    projects = Column(Integer, default=0)
    commits = Column(Integer, default=0)
    badges = Column(String, default="")
    created_at = Column(DateTime, server_default=func.now())

class Internship(Base):
    __tablename__ = "internships"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    company = Column(String)
    description = Column(Text)
    location = Column(String, default="Remote")
    stipend = Column(String, default="")
    duration = Column(String, default="")
    google_form_link = Column(String)
    tag = Column(String, default="")
    created_at = Column(DateTime, server_default=func.now())

Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    admin = db.query(Admin).filter(Admin.username == username).first()
    if admin is None:
        raise HTTPException(status_code=401, detail="Admin not found")
    return admin

def seed_admin():
    db = SessionLocal()
    admin = db.query(Admin).filter(Admin.username == "admin").first()
    if not admin:
        admin = Admin(username="admin", hashed_password=pwd_context.hash("admin123"))
        db.add(admin)
        db.commit()
    db.close()

app = FastAPI(title="AfterClass API", version="2.0.0")

origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    seed_admin()

# --- Auth ---
class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/auth/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.username == req.username).first()
    if not admin or not pwd_context.verify(req.password, admin.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": admin.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/api/auth/me")
def get_me(admin: Admin = Depends(get_current_admin)):
    return {"username": admin.username}

# --- Generic CRUD helpers ---
def create_item(db, model, data):
    item = model(**data)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def update_item(db, model, item_id, data):
    item = db.query(model).filter(model.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in data.items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

def delete_item(db, model, item_id):
    item = db.query(model).filter(model.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(item)
    db.commit()
    return {"ok": True}

# --- Resources ---
class ResourceSchema(BaseModel):
    title: str
    description: str
    tag: str = ""
    link: str = ""

@app.get("/api/resources")
def list_resources(db: Session = Depends(get_db)):
    return db.query(Resource).order_by(Resource.created_at.desc()).all()

@app.post("/api/admin/resources")
def create_resource(data: ResourceSchema, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return create_item(db, Resource, data.model_dump())

@app.put("/api/admin/resources/{item_id}")
def update_resource(item_id: int, data: ResourceSchema, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return update_item(db, Resource, item_id, data.model_dump())

@app.delete("/api/admin/resources/{item_id}")
def delete_resource(item_id: int, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return delete_item(db, Resource, item_id)

# --- Projects ---
class ProjectSchema(BaseModel):
    title: str
    description: str
    author: str = ""
    tech: str = ""
    github: str = ""
    demo: str = ""

@app.get("/api/projects")
def list_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.created_at.desc()).all()

@app.post("/api/admin/projects")
def create_project(data: ProjectSchema, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return create_item(db, Project, data.model_dump())

@app.put("/api/admin/projects/{item_id}")
def update_project(item_id: int, data: ProjectSchema, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return update_item(db, Project, item_id, data.model_dump())

@app.delete("/api/admin/projects/{item_id}")
def delete_project(item_id: int, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return delete_item(db, Project, item_id)

# --- Opportunities ---
class OpportunitySchema(BaseModel):
    title: str
    type: str = ""
    location: str = ""
    extra: str = ""
    tag: str = ""
    action: str = "Apply"

@app.get("/api/opportunities")
def list_opportunities(db: Session = Depends(get_db)):
    return db.query(Opportunity).order_by(Opportunity.created_at.desc()).all()

@app.post("/api/admin/opportunities")
def create_opportunity(data: OpportunitySchema, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return create_item(db, Opportunity, data.model_dump())

@app.put("/api/admin/opportunities/{item_id}")
def update_opportunity(item_id: int, data: OpportunitySchema, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return update_item(db, Opportunity, item_id, data.model_dump())

@app.delete("/api/admin/opportunities/{item_id}")
def delete_opportunity(item_id: int, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return delete_item(db, Opportunity, item_id)

# --- Members ---
class MemberSchema(BaseModel):
    name: str
    role: str = ""
    tag: str = ""
    quote: str = ""
    skills: str = ""
    projects: int = 0
    commits: int = 0
    badges: str = ""

@app.get("/api/members")
def list_members(db: Session = Depends(get_db)):
    return db.query(Member).order_by(Member.created_at.desc()).all()

@app.post("/api/admin/members")
def create_member(data: MemberSchema, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return create_item(db, Member, data.model_dump())

@app.put("/api/admin/members/{item_id}")
def update_member(item_id: int, data: MemberSchema, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return update_item(db, Member, item_id, data.model_dump())

@app.delete("/api/admin/members/{item_id}")
def delete_member(item_id: int, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return delete_item(db, Member, item_id)

# --- Internships ---
class InternshipSchema(BaseModel):
    title: str
    company: str = ""
    description: str = ""
    location: str = "Remote"
    stipend: str = ""
    duration: str = ""
    google_form_link: str
    tag: str = ""

@app.get("/api/internships")
def list_internships(db: Session = Depends(get_db)):
    return db.query(Internship).order_by(Internship.created_at.desc()).all()

@app.post("/api/admin/internships")
def create_internship(data: InternshipSchema, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return create_item(db, Internship, data.model_dump())

@app.put("/api/admin/internships/{item_id}")
def update_internship(item_id: int, data: InternshipSchema, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return update_item(db, Internship, item_id, data.model_dump())

@app.delete("/api/admin/internships/{item_id}")
def delete_internship(item_id: int, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    return delete_item(db, Internship, item_id)

@app.get("/")
def read_root():
    return {"message": "Welcome to the AfterClass API!"}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
