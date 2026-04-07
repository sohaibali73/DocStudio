# Potomac Studio - Cline AI Agent Deployment Plan

## Project Overview

Potomac Studio is an AI-powered document creation platform with a Next.js frontend and a Python FastAPI backend. The system generates brand-compliant documents (DOCX), presentations (PPTX), and spreadsheets (XLSX) using AI assistance.

---

## Phase 1: Repository Setup and Initial Configuration

### Objective
Clone the repository and establish the project structure for both frontend and backend services.

### Step 1.1: Clone the Repository
```bash
git clone <repository-url> potomac-studio
cd potomac-studio
```

### Step 1.2: Verify Project Structure
Ensure the following directory structure exists after cloning:
```
potomac-studio/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   └── document-studio/    # Main studio components
├── lib/                    # Utility functions
├── public/                 # Static assets
├── backend/                # Python FastAPI backend (to be created)
├── scripts/                # Database migrations and utilities
├── package.json            # Node.js dependencies
└── next.config.mjs         # Next.js configuration
```

### Step 1.3: Create Backend Directory Structure
Execute the following commands to create the backend structure:
```bash
mkdir -p backend/app/api
mkdir -p backend/app/core
mkdir -p backend/app/services
mkdir -p backend/app/models
mkdir -p backend/app/schemas
mkdir -p backend/tests
```

---

## Phase 2: Frontend Environment Setup

### Objective
Install frontend dependencies and configure environment variables.

### Step 2.1: Install Node.js Dependencies
```bash
pnpm install
```

### Step 2.2: Create Frontend Environment File
Create a file named `.env.local` in the project root with the following content:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Potomac Studio

# Authentication (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# File Storage
NEXT_PUBLIC_STORAGE_BUCKET=potomac-documents
```

### Step 2.3: Verify Frontend Build
```bash
pnpm build
```
This command should complete without errors. If errors occur, review the console output and address any missing dependencies or type errors.

---

## Phase 3: Backend Environment Setup

### Objective
Set up the Python FastAPI backend with all required dependencies.

### Step 3.1: Create Python Virtual Environment
```bash
cd backend
python -m venv venv
```

### Step 3.2: Activate Virtual Environment
For Linux/macOS:
```bash
source venv/bin/activate
```
For Windows:
```bash
.\venv\Scripts\activate
```

### Step 3.3: Create Backend Requirements File
Create `backend/requirements.txt` with the following content:
```txt
# Core Framework
fastapi==0.109.2
uvicorn[standard]==0.27.1
python-multipart==0.0.9

# Database
sqlalchemy==2.0.25
asyncpg==0.29.0
alembic==1.13.1

# AI Integration
openai==1.12.0
anthropic==0.18.1
langchain==0.1.9
langchain-openai==0.0.6

# Document Generation
python-docx==1.1.0
python-pptx==0.6.23
openpyxl==3.1.2
xlsxwriter==3.1.9

# File Storage
boto3==1.34.34
python-magic==0.4.27

# Utilities
pydantic==2.6.1
pydantic-settings==2.2.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
httpx==0.26.0
redis==5.0.1
celery==5.3.6

# Development
pytest==8.0.0
pytest-asyncio==0.23.4
black==24.1.1
ruff==0.2.1
```

### Step 3.4: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 3.5: Create Backend Environment File
Create `backend/.env` with the following content:
```env
# Application
APP_NAME=Potomac Studio API
APP_ENV=development
DEBUG=true
SECRET_KEY=your-secret-key-min-32-chars-long-here

# Database
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/potomac_studio

# Redis (for background jobs)
REDIS_URL=redis://localhost:6379/0

# AI Providers
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# File Storage (S3-compatible)
S3_ENDPOINT_URL=https://your-r2-account.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=potomac-documents
S3_REGION=auto

# Brand Compliance
BRAND_COMPLIANCE_STRICT=true
DEFAULT_BRAND_PROFILE=default
```

---

## Phase 4: Backend Application Files

### Objective
Create the core backend application files.

### Step 4.1: Create Main Application Entry Point
Create `backend/app/main.py`:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api import documents, ai_commands, compliance, files, health
from app.core.config import settings
from app.core.database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown: Close connections
    await engine.dispose()

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(health.router, tags=["Health"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(ai_commands.router, prefix="/api/ai", tags=["AI"])
app.include_router(compliance.router, prefix="/api/compliance", tags=["Compliance"])
app.include_router(files.router, prefix="/api/files", tags=["Files"])
```

### Step 4.2: Create Configuration Module
Create `backend/app/core/config.py`:
```python
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    APP_NAME: str = "Potomac Studio API"
    APP_ENV: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str
    
    # Database
    DATABASE_URL: str
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # AI Providers
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    
    # S3 Storage
    S3_ENDPOINT_URL: Optional[str] = None
    S3_ACCESS_KEY_ID: Optional[str] = None
    S3_SECRET_ACCESS_KEY: Optional[str] = None
    S3_BUCKET_NAME: str = "potomac-documents"
    S3_REGION: str = "auto"
    
    # Brand Compliance
    BRAND_COMPLIANCE_STRICT: bool = True
    DEFAULT_BRAND_PROFILE: str = "default"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
```

### Step 4.3: Create Database Module
Create `backend/app/core/database.py`:
```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    future=True
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
```

### Step 4.4: Create Document Models
Create `backend/app/models/document.py`:
```python
from sqlalchemy import Column, String, Integer, DateTime, Text, Enum, Float
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum

from app.core.database import Base

class DocumentType(str, enum.Enum):
    DOCX = "docx"
    PPTX = "pptx"
    XLSX = "xlsx"

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    document_type = Column(Enum(DocumentType), nullable=False)
    content = Column(Text, nullable=True)
    file_path = Column(String(512), nullable=True)
    compliance_score = Column(Float, default=100.0)
    version = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

### Step 4.5: Create API Schemas
Create `backend/app/schemas/document.py`:
```python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID
from enum import Enum

class DocumentType(str, Enum):
    docx = "docx"
    pptx = "pptx"
    xlsx = "xlsx"

class DocumentCreate(BaseModel):
    title: str
    document_type: DocumentType
    content: Optional[str] = None

class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class DocumentResponse(BaseModel):
    id: UUID
    title: str
    document_type: DocumentType
    content: Optional[str]
    compliance_score: float
    version: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class AICommandRequest(BaseModel):
    command: str  # /write, /improve, /translate, etc.
    prompt: str
    document_id: Optional[UUID] = None
    context: Optional[str] = None

class AICommandResponse(BaseModel):
    success: bool
    result: str
    suggestions: Optional[list[str]] = None

class ComplianceCheckRequest(BaseModel):
    document_id: UUID
    content: str

class ComplianceCheckResponse(BaseModel):
    score: float
    issues: list[dict]
    passed: bool
```

### Step 4.6: Create API Routers
Create `backend/app/api/__init__.py`:
```python
# API Router Package
```

Create `backend/app/api/health.py`:
```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Potomac Studio API"}
```

Create `backend/app/api/documents.py`:
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID

from app.core.database import get_db
from app.models.document import Document
from app.schemas.document import DocumentCreate, DocumentUpdate, DocumentResponse

router = APIRouter()

@router.post("/create", response_model=DocumentResponse)
async def create_document(
    data: DocumentCreate,
    db: AsyncSession = Depends(get_db)
):
    document = Document(
        title=data.title,
        document_type=data.document_type.value,
        content=data.content,
        user_id="00000000-0000-0000-0000-000000000000"  # Replace with auth
    )
    db.add(document)
    await db.commit()
    await db.refresh(document)
    return document

@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(
    document_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Document).where(Document.id == document_id)
    )
    document = result.scalar_one_or_none()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

@router.put("/{document_id}", response_model=DocumentResponse)
async def update_document(
    document_id: UUID,
    data: DocumentUpdate,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Document).where(Document.id == document_id)
    )
    document = result.scalar_one_or_none()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if data.title:
        document.title = data.title
    if data.content:
        document.content = data.content
        document.version += 1
    
    await db.commit()
    await db.refresh(document)
    return document

@router.delete("/{document_id}")
async def delete_document(
    document_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Document).where(Document.id == document_id)
    )
    document = result.scalar_one_or_none()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    await db.delete(document)
    await db.commit()
    return {"success": True, "message": "Document deleted"}
```

Create `backend/app/api/ai_commands.py`:
```python
from fastapi import APIRouter, HTTPException
from app.schemas.document import AICommandRequest, AICommandResponse
from app.services.ai_router import AIRouter

router = APIRouter()
ai_router = AIRouter()

@router.post("/command", response_model=AICommandResponse)
async def process_ai_command(request: AICommandRequest):
    try:
        result = await ai_router.process_command(
            command=request.command,
            prompt=request.prompt,
            context=request.context
        )
        return AICommandResponse(
            success=True,
            result=result["content"],
            suggestions=result.get("suggestions")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

Create `backend/app/api/compliance.py`:
```python
from fastapi import APIRouter
from app.schemas.document import ComplianceCheckRequest, ComplianceCheckResponse
from app.services.compliance import ComplianceEngine

router = APIRouter()
compliance_engine = ComplianceEngine()

@router.post("/check", response_model=ComplianceCheckResponse)
async def check_compliance(request: ComplianceCheckRequest):
    result = compliance_engine.check(request.content)
    return ComplianceCheckResponse(
        score=result["score"],
        issues=result["issues"],
        passed=result["score"] >= 80.0
    )
```

Create `backend/app/api/files.py`:
```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.document import Document

router = APIRouter()

@router.get("/list")
async def list_files(
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Document)
        .order_by(Document.updated_at.desc())
        .offset(skip)
        .limit(limit)
    )
    documents = result.scalars().all()
    return {
        "files": [
            {
                "id": str(doc.id),
                "title": doc.title,
                "type": doc.document_type,
                "updated_at": doc.updated_at.isoformat()
            }
            for doc in documents
        ],
        "total": len(documents)
    }
```

### Step 4.7: Create Core Services
Create `backend/app/services/__init__.py`:
```python
# Services Package
```

Create `backend/app/services/ai_router.py`:
```python
from typing import Optional
from openai import AsyncOpenAI
from app.core.config import settings

class AIRouter:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        
        self.command_prompts = {
            "/write": "Write professional content based on the following request:",
            "/improve": "Improve and enhance the following text while maintaining its meaning:",
            "/translate": "Translate the following text accurately:",
            "/fix": "Fix grammar, spelling, and punctuation in the following text:",
            "/summarize": "Provide a concise summary of the following content:",
            "/brainstorm": "Generate creative ideas and suggestions for:"
        }
    
    async def process_command(
        self,
        command: str,
        prompt: str,
        context: Optional[str] = None
    ) -> dict:
        system_prompt = self.command_prompts.get(command, "Process the following request:")
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
        
        if context:
            messages.insert(1, {"role": "user", "content": f"Context: {context}"})
        
        response = await self.client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=messages,
            temperature=0.7,
            max_tokens=2000
        )
        
        return {
            "content": response.choices[0].message.content,
            "suggestions": None
        }
```

Create `backend/app/services/compliance.py`:
```python
import re
from typing import Any

class ComplianceEngine:
    def __init__(self):
        self.rules = {
            "brand_colors": {
                "allowed": ["#0A0A1B", "#1E1E3F", "#2DD4BF", "#14B8A6", "#FFFFFF"],
                "weight": 20
            },
            "typography": {
                "allowed_fonts": ["Geist", "Geist Mono", "Inter", "Arial"],
                "min_body_size": 11,
                "weight": 25
            },
            "disclaimers": {
                "required_patterns": [
                    r"confidential",
                    r"proprietary"
                ],
                "weight": 30
            },
            "terminology": {
                "forbidden": ["guarantee", "promise", "always", "never"],
                "replacements": {
                    "guarantee": "commitment",
                    "promise": "objective"
                },
                "weight": 25
            }
        }
    
    def check(self, content: str) -> dict[str, Any]:
        issues = []
        total_score = 100.0
        
        # Check terminology
        for word in self.rules["terminology"]["forbidden"]:
            if re.search(rf"\b{word}\b", content, re.IGNORECASE):
                issues.append({
                    "type": "terminology",
                    "severity": "warning",
                    "message": f"Forbidden term '{word}' detected",
                    "suggestion": self.rules["terminology"]["replacements"].get(word)
                })
                total_score -= 5
        
        # Check disclaimers (if document appears to be final)
        has_disclaimer = any(
            re.search(pattern, content, re.IGNORECASE)
            for pattern in self.rules["disclaimers"]["required_patterns"]
        )
        if not has_disclaimer and len(content) > 500:
            issues.append({
                "type": "disclaimer",
                "severity": "error",
                "message": "Missing required confidentiality disclaimer",
                "suggestion": "Add confidentiality notice to document header or footer"
            })
            total_score -= 15
        
        return {
            "score": max(0, total_score),
            "issues": issues,
            "checked_rules": list(self.rules.keys())
        }
```

Create `backend/app/services/document_generator.py`:
```python
from docx import Document as DocxDocument
from pptx import Presentation
from openpyxl import Workbook
import io
from typing import Optional

class DocumentGenerator:
    @staticmethod
    def create_docx(
        title: str,
        content: str,
        template_path: Optional[str] = None
    ) -> bytes:
        if template_path:
            doc = DocxDocument(template_path)
        else:
            doc = DocxDocument()
        
        doc.add_heading(title, 0)
        
        for paragraph in content.split("\n\n"):
            if paragraph.strip():
                doc.add_paragraph(paragraph.strip())
        
        buffer = io.BytesIO()
        doc.save(buffer)
        buffer.seek(0)
        return buffer.getvalue()
    
    @staticmethod
    def create_pptx(
        title: str,
        slides_content: list[dict],
        template_path: Optional[str] = None
    ) -> bytes:
        if template_path:
            prs = Presentation(template_path)
        else:
            prs = Presentation()
        
        # Title slide
        title_slide_layout = prs.slide_layouts[0]
        slide = prs.slides.add_slide(title_slide_layout)
        slide.shapes.title.text = title
        
        # Content slides
        content_layout = prs.slide_layouts[1]
        for slide_data in slides_content:
            slide = prs.slides.add_slide(content_layout)
            slide.shapes.title.text = slide_data.get("title", "")
            if slide.placeholders[1]:
                slide.placeholders[1].text = slide_data.get("content", "")
        
        buffer = io.BytesIO()
        prs.save(buffer)
        buffer.seek(0)
        return buffer.getvalue()
    
    @staticmethod
    def create_xlsx(
        title: str,
        sheets_data: list[dict]
    ) -> bytes:
        wb = Workbook()
        
        # Remove default sheet
        wb.remove(wb.active)
        
        for sheet_data in sheets_data:
            ws = wb.create_sheet(title=sheet_data.get("name", "Sheet"))
            
            # Add headers
            headers = sheet_data.get("headers", [])
            for col, header in enumerate(headers, 1):
                ws.cell(row=1, column=col, value=header)
            
            # Add data rows
            rows = sheet_data.get("rows", [])
            for row_idx, row in enumerate(rows, 2):
                for col_idx, value in enumerate(row, 1):
                    ws.cell(row=row_idx, column=col_idx, value=value)
        
        buffer = io.BytesIO()
        wb.save(buffer)
        buffer.seek(0)
        return buffer.getvalue()
```

---

## Phase 5: Database Setup

### Objective
Set up and initialize the PostgreSQL database.

### Step 5.1: Install PostgreSQL
Ensure PostgreSQL is installed and running on the local machine or use a cloud provider.

For local installation:
```bash
# macOS (using Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 5.2: Create Database
```bash
psql -U postgres -c "CREATE DATABASE potomac_studio;"
psql -U postgres -c "CREATE USER potomac_user WITH PASSWORD 'secure_password_here';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE potomac_studio TO potomac_user;"
```

### Step 5.3: Update Database URL
Update the `DATABASE_URL` in `backend/.env`:
```env
DATABASE_URL=postgresql+asyncpg://potomac_user:secure_password_here@localhost:5432/potomac_studio
```

### Step 5.4: Initialize Alembic for Migrations
```bash
cd backend
alembic init alembic
```

Update `alembic/env.py` to use async configuration and import your models.

### Step 5.5: Create Initial Migration
```bash
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

---

## Phase 6: Redis Setup (Optional - for Background Jobs)

### Objective
Set up Redis for caching and background job processing.

### Step 6.1: Install Redis
```bash
# macOS
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis-server
```

### Step 6.2: Verify Redis Connection
```bash
redis-cli ping
# Should return: PONG
```

---

## Phase 7: Running the Application

### Objective
Start both frontend and backend services.

### Step 7.1: Start Backend Server
Open a terminal and execute:
```bash
cd backend
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
API documentation will be at `http://localhost:8000/docs`

### Step 7.2: Start Frontend Development Server
Open a second terminal and execute:
```bash
cd potomac-studio  # project root
pnpm dev
```

The frontend will be available at `http://localhost:3000`

### Step 7.3: Verify Connection
1. Open `http://localhost:3000` in a browser
2. Open browser developer tools (F12)
3. Navigate to Network tab
4. Perform an action in the UI
5. Verify API calls reach `http://localhost:8000`

---

## Phase 8: Production Deployment

### Objective
Deploy the application to production infrastructure.

### Step 8.1: Frontend Deployment (Vercel)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your production API URL
   - `NEXT_PUBLIC_SUPABASE_URL`: If using Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: If using Supabase

### Step 8.2: Backend Deployment (Railway or Render)

#### Option A: Railway
1. Create Railway account at railway.app
2. Create new project from GitHub repository
3. Add PostgreSQL plugin
4. Add Redis plugin
5. Configure environment variables
6. Deploy

#### Option B: Render
1. Create Render account at render.com
2. Create new Web Service from GitHub
3. Configure:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add PostgreSQL database
5. Add Redis instance
6. Configure environment variables

### Step 8.3: Database Migration in Production
```bash
# SSH into production server or use Railway/Render shell
alembic upgrade head
```

### Step 8.4: Configure DNS and SSL
1. Add custom domain in hosting provider
2. Configure DNS records (A or CNAME)
3. SSL certificates are typically automatic with Vercel/Railway/Render

---

## Phase 9: Environment Variables Reference

### Frontend (.env.local)
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application display name | No |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | If using Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | If using Supabase |

### Backend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `SECRET_KEY` | JWT signing key (min 32 chars) | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `REDIS_URL` | Redis connection string | No |
| `OPENAI_API_KEY` | OpenAI API key | Yes |
| `ANTHROPIC_API_KEY` | Anthropic API key | No |
| `S3_ENDPOINT_URL` | S3-compatible storage URL | No |
| `S3_ACCESS_KEY_ID` | S3 access key | No |
| `S3_SECRET_ACCESS_KEY` | S3 secret key | No |
| `S3_BUCKET_NAME` | Storage bucket name | No |

---

## Phase 10: Troubleshooting

### Common Issues

#### Issue: Database Connection Failed
```
Solution: Verify DATABASE_URL format and ensure PostgreSQL is running
Test: psql -h localhost -U potomac_user -d potomac_studio
```

#### Issue: CORS Errors in Browser
```
Solution: Verify frontend URL is in backend CORS allow_origins list
Location: backend/app/main.py - CORSMiddleware configuration
```

#### Issue: AI Commands Not Working
```
Solution: Verify OPENAI_API_KEY is set and valid
Test: curl -H "Authorization: Bearer $OPENAI_API_KEY" https://api.openai.com/v1/models
```

#### Issue: File Uploads Failing
```
Solution: Verify S3 credentials and bucket permissions
Test: Use AWS CLI or S3-compatible tool to test bucket access
```

---

## Phase 11: Post-Deployment Checklist

Execute the following verification steps after deployment:

1. [ ] Frontend loads without console errors
2. [ ] API health endpoint returns 200: `GET /health`
3. [ ] Document creation works: `POST /api/documents/create`
4. [ ] AI commands respond: `POST /api/ai/command`
5. [ ] Compliance checking works: `POST /api/compliance/check`
6. [ ] File listing returns data: `GET /api/files/list`
7. [ ] SSL certificate is valid
8. [ ] Custom domain resolves correctly

---

## Summary

This deployment plan provides a complete guide for setting up Potomac Studio from repository clone to production deployment. The key phases are:

1. **Repository Setup** - Clone and establish structure
2. **Frontend Setup** - Install Node.js dependencies and configure environment
3. **Backend Setup** - Create Python environment and install dependencies
4. **Backend Files** - Implement FastAPI application, routes, and services
5. **Database Setup** - Configure PostgreSQL
6. **Redis Setup** - Optional caching layer
7. **Local Running** - Start both services
8. **Production Deployment** - Deploy to cloud infrastructure
9. **Environment Variables** - Complete reference
10. **Troubleshooting** - Common issues and solutions
11. **Post-Deployment** - Verification checklist

For questions or issues not covered in this plan, refer to the official documentation of each technology or create an issue in the project repository.
