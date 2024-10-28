from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = ["http://localhost:8081", "http://127.0.0.1:8081"]
  # Substitua por sua origem permitida

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Usuario(BaseModel):
    nome: str
    idade: int
class UsuarioRead(Usuario):
    id: int

# Simulando dados para a lista 

dados = [
    "id" 1, "nome" = "Item 1",
    "id" 2, "nome" = "Item 2",
    "id" 3, "nome" = "Item 3"
]

@app.get("/itens")
async def obter_itens():
    return dados

@app.post("/usuarios")
async def salvar_item(usuario: Usuario):
    u = {
        "id": len(dados)+1
        ,"nome": usuario.nome
        ,"idade": usuario.idade
    }
    dados.append(u)
    return {"mensagem": "Usuário criado com sucesso!", "id": u["id"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host= "0.0.0.0", port=8000 )