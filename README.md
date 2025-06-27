# 📘 Documentação Técnica – CB Games: Criador de Personagens

## 📌 Visão Geral

CB Games é uma aplicação web voltada para criação e personalização de personagens em um ambiente temático medieval. Usuários podem se registrar, fazer login e montar seus personagens definindo atributos como força, inteligência, agilidade, resistência, armas, armaduras e aparência.

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Python + Flask  
- **ORM:** SQLAlchemy  
- **Banco de dados:** SQLite  
- **Frontend:** HTML5, Bootstrap 5, CSS3 personalizado, JavaScript  
- **Template engine:** Jinja2  
- **Gerenciamento de senha:** Hashing com `werkzeug.security`

---

## 📁 Estrutura do Projeto

```
projeto_cb_games/
├── app.py                      # Aplicação Flask principal
├── requirements.txt            # Dependências do projeto
├── README.md                   # Documentação original
├── static/
│   └── assets/
│       ├── css/style.css       # Estilo visual medieval
│       ├── js/scripts.js       # Scripts JS para interação
│       ├── img/                # Imagens utilizadas
│       └── music/              # Trilha sonora do jogo
├── templates/                  # Templates HTML (Jinja2)
│   ├── base.html
│   ├── index.html
│   ├── login.html
│   ├── cadastro.html
│   ├── dashboard.html
│   └── criar_personagem.html
```

---

## 🔐 Funcionalidades

### Autenticação:
- Cadastro de usuário com validação de unicidade
- Login seguro com hash de senha
- Sessões com controle de acesso (via `session`)

### Personagens:
- Criação de personagens com:
  - Nome
  - Atributos: força, inteligência, agilidade, resistência
  - Itens: arma, escudo, armadura, cabelo ou capacete
  - Aparência: cor da pele
- Listagem de personagens cadastrados
- Visualização da ficha com porcentagens
- Exclusão de personagens

---

## 🔀 Rotas Principais

| Rota                 | Método | Descrição |
|----------------------|--------|------------|
| `/`                  | GET    | Página inicial |
| `/login`             | GET/POST | Login do usuário |
| `/cadastro`          | GET/POST | Registro de novo usuário |
| `/dashboard`         | GET    | Lista os personagens do usuário logado |
| `/criar_personagem`  | GET/POST | Formulário para criar novo personagem |
| `/sair`              | GET    | Encerra a sessão e faz logout |

---

## 🧪 Como Rodar Localmente

### 1. Clonar o projeto:
```bash
git clone [https://github.com/FlaubertWeb/CB-Games-criador-de-personagens]

```

### 2. Criar e ativar ambiente virtual:
```bash 
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```

### 3. Instalar as dependências:
```bash
pip install -r requirements.txt
```

### 4. Criar banco de dados:
Dentro do terminal Python (ou em um script separado):
```python
from app import db
db.create_all()
```

### 5. Executar o servidor:
```bash
python app.py
```

Acesse: [http://localhost:5000](http://localhost:5000)

---

## 🔐 Segurança

- Senhas são criptografadas com `werkzeug.security`
- Sessões são protegidas por uma `secret_key` definida no `app.py`
- Recomenda-se mover essa chave para uma variável de ambiente em produção


