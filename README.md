# Documentação do Projeto: CB Games - Criador de Personagens

## 🌟 Visão Geral

CB Games é um sistema web de cadastro e personalização de personagens com estética medieval, permitindo aos usuários criarem contas, gerenciarem personagens e interagirem com uma interface visual rica.

--- 

## 🎨 Tecnologias Utilizadas

* **Backend:** Python (Flask)
* **Frontend:** HTML, CSS (Bootstrap + custom), JavaScript
* **Banco de Dados:** SQLite com SQLAlchemy
* **Templates:** Jinja2

---

## 📄 Estrutura do Projeto

```
projeto_cb_games/
├── app.py                  # Arquivo principal com as rotas e lógica do servidor
├── templates/              # HTMLs usando Jinja2
│   ├── base.html
│   ├── index.html
│   ├── login.html
│   ├── cadastro.html
│   ├── dashboard.html
│   └── criar_personagem.html
├── static/
│   └── assets/
│       ├── css/style.css   # Estilos customizados (visual medieval)
│       ├── js/scripts.js   # Scripts JS (seleção de personagem etc.)
│       └── img/            # Imagens de itens, personagens etc.
└── cbgames.db              # Banco SQLite local
```

---

## 🔒 Funcionalidades

### Cadastro e Login

* Criação de conta com username único e senha criptografada (hash).
* Login com verificação e sessão.

### Dashboard

* Listagem dos personagens do usuário logado.
* Visualização em cards com atributos e sprites visuais (armadura, arma etc.).
* Opção de excluir ou selecionar personagem.

### Criação de Personagem

* Formulário com distribução de atributos (força, agilidade, etc.).
* Escolha de itens (armas, escudos, armaduras).
* Renderização visual com sprites empilhados.

---

## 📊 Models (Banco de Dados)

```python
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    senha_hash = db.Column(db.String(200), nullable=False)

class Personagem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    forca = db.Column(db.Integer)
    inteligencia = db.Column(db.Integer)
    agilidade = db.Column(db.Integer)
    resistencia = db.Column(db.Integer)
    arma = db.Column(db.String(100))
    escudo = db.Column(db.String(100))
    armadura = db.Column(db.String(100))
    capacete = db.Column(db.String(100))
    cabelo = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
```

---

## 🔧 Melhoria Recomendada

* Adicionar campo `personagem_ativo` no model `Usuario` ou `Personagem`.
* Criar helper `@app.context_processor` para injetar `user` em todos os templates.
* Melhorar validação de atributos no backend.
* Adicionar animação visual e feedback de seleção de personagem.

---

## 📤 Deploy

O projeto pode ser facilmente publicado no **Render**, **Railway** ou **Heroku**. Basta:

* Criar arquivo `requirements.txt`
* Criar `Procfile` com:

```
web: gunicorn app:app
```

* Ajustar variável `host` em `app.run()` ou usar `gunicorn` em produção.

---

## 🔧 Comandos úteis

```bash
# Iniciar o servidor local
flask run

# Criar banco de dados
python
>>> from app import db
>>> db.create_all()
```

---

## 🏆 Créditos

Desenvolvido por **Flaubert**, como projeto da Infinity School.
Design, lógica, sprites e interatividade personalizados para o contexto medieval e foco em experiência de criação de personagens.
