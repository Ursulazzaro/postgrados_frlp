from passlib.context import CryptContext
import jwt
import os
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("JWT_SECRET", "desarrollo_secret")
ALGORITHM = "HS256"

security = HTTPBearer()

# 2. Funciones de Contraseñas
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# 3. Generación del Token (Login)
def created_token_access(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido o manipulado")

class RoleRequired:
    def __init__(self, roles_permitidos: list[str]):
        self.roles_permitidos = roles_permitidos

    def __call__(self, payload: dict = Depends(verify_token)):
        user_role = payload.get("rol")
        
        if not user_role:
            raise HTTPException(status_code=403, detail="El token no contiene un rol válido")
            
        if user_role not in self.roles_permitidos:
            raise HTTPException(
                status_code=403, 
                detail="Permisos insuficientes. Se requiere rol: " + ", ".join(self.roles_permitidos)
            )
        
        return payload
