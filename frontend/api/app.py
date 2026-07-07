from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, func
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from pathlib import Path
import os

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[2]
DB_PATH = BASE_DIR / "afterclass.db"
load_dotenv(BASE_DIR / ".env")

SECRET_KEY = os.getenv("SECRET_KEY", "afterclass-super-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 30
DEFAULT_ADMIN_USERNAME = "admin_afterclass"
DEFAULT_ADMIN_PASSWORD = "SecurePass!2026"


def normalize_database_url(value: str) -> str:
    cleaned_value = value.strip()
    for marker in ("ADMIN_USERNAME=", "ADMIN_PASSWORD=", "SECRET_KEY=", "ACCESS_TOKEN_EXPIRE_DAYS="):
        if marker in cleaned_value:
            cleaned_value = cleaned_value.split(marker, 1)[0].rstrip()
    return cleaned_value


def get_database_url():
    for key in ("DATABASE_URL", "POSTGRES_URL", "NEON_DATABASE_URL"):
        value = os.getenv(key)
        if value:
            value = normalize_database_url(value)
            if value.startswith("postgres://"):
                return value.replace("postgres://", "postgresql+psycopg://", 1)
            if value.startswith("postgresql://"):
                return value.replace("postgresql://", "postgresql+psycopg://", 1)
            return value
    if os.getenv("VERCEL"):
        return "sqlite:////tmp/afterclass.db"
    return f"sqlite:///{DB_PATH}"


SQLALCHEMY_DATABASE_URL = get_database_url()
engine_kwargs = {}
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine_kwargs["connect_args"] = {"check_same_thread": False}
else:
    engine_kwargs["poolclass"] = NullPool

engine = create_engine(SQLALCHEMY_DATABASE_URL, **engine_kwargs)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="admin")


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
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        import traceback
        raise Exception(f"Failed to create tables: {traceback.format_exc()}")

    db = SessionLocal()
    try:
        admin = db.query(Admin).filter(Admin.username == DEFAULT_ADMIN_USERNAME).first()
        if not admin:
            admin = Admin(
                username=DEFAULT_ADMIN_USERNAME,
                hashed_password=pwd_context.hash(DEFAULT_ADMIN_PASSWORD),
                role="super_admin",
            )
            db.add(admin)
        else:
            try:
                password_matches = pwd_context.verify(DEFAULT_ADMIN_PASSWORD, admin.hashed_password)
            except Exception:
                password_matches = False
            if not password_matches:
                admin.hashed_password = pwd_context.hash(DEFAULT_ADMIN_PASSWORD)
            if admin.role != "super_admin":
                admin.role = "super_admin"
        db.commit()
    except Exception as e:
        db.rollback()
        import traceback
        raise Exception(f"Failed to seed admin: {traceback.format_exc()}")
    finally:
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





class LoginRequest(BaseModel):
    username: str
    password: str


@app.post("/api/auth/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    try:
        seed_admin()
        admin = db.query(Admin).filter(Admin.username == req.username).first()
        if not admin:
            raise HTTPException(status_code=401, detail="Invalid credentials - user not found")
            
        try:
            is_valid = pwd_context.verify(req.password[:72], admin.hashed_password)
        except Exception as e:
            is_valid = False
            import traceback
            print(f"Password verify exception: {traceback.format_exc()}")
            
        if not is_valid:
            raise HTTPException(status_code=401, detail="Invalid credentials - wrong password")
        token = create_access_token({"sub": admin.username})
        return {"access_token": token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        error_msg = traceback.format_exc()
        raise HTTPException(status_code=500, detail=str(error_msg))


@app.get("/api/auth/me")
def get_me(admin: Admin = Depends(get_current_admin)):
    return {"id": admin.id, "username": admin.username, "role": admin.role}


def require_super_admin(admin: Admin = Depends(get_current_admin)):
    if admin.role != "super_admin":
        raise HTTPException(status_code=403, detail="Super admin access required")
    return admin


class AdminCreate(BaseModel):
    username: str
    password: str
    role: str = "admin"


class AdminUpdate(BaseModel):
    username: str | None = None
    password: str | None = None
    role: str | None = None


class AdminResponse(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        from_attributes = True


@app.get("/api/admin/admins")
def list_admins(db: Session = Depends(get_db), admin: Admin = Depends(require_super_admin)):
    return db.query(Admin).all()


@app.post("/api/admin/admins")
def create_admin(req: AdminCreate, db: Session = Depends(get_db), admin: Admin = Depends(require_super_admin)):
    existing = db.query(Admin).filter(Admin.username == req.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    new_admin = Admin(username=req.username, hashed_password=pwd_context.hash(req.password), role=req.role)
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin


@app.put("/api/admin/admins/{admin_id}")
def update_admin(admin_id: int, req: AdminUpdate, db: Session = Depends(get_db), admin: Admin = Depends(require_super_admin)):
    target = db.query(Admin).filter(Admin.id == admin_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Admin not found")
    if req.username is not None:
        target.username = req.username
    if req.password is not None:
        target.hashed_password = pwd_context.hash(req.password)
    if req.role is not None:
        target.role = req.role
    db.commit()
    db.refresh(target)
    return target


@app.delete("/api/admin/admins/{admin_id}")
def delete_admin(admin_id: int, db: Session = Depends(get_db), admin: Admin = Depends(require_super_admin)):
    if admin.id == admin_id:
        raise HTTPException(status_code=400, detail="Cannot delete yourself")
    target = db.query(Admin).filter(Admin.id == admin_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Admin not found")
    db.delete(target)
    db.commit()
    return {"ok": True}


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