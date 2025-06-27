from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
app.secret_key = 'chave_secreta_segura'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cbgames.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# MODELOS
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
    cor = db.Column(db.String(7))  # <-- Salva o código hex direto, tipo "#f1c27d"
    user_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))



# ROTAS
@app.after_request
def add_header(response):
    response.cache_control.max_age = 31536000  # 1 ano
    response.cache_control.public = True
    return response

 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'usuario_id' in session: 
        return redirect(url_for('dashboard')) 

    if request.method == 'POST':
        usuario = request.form['usuario']
        senha = request.form['senha']
        user = Usuario.query.filter_by(username=usuario).first()
        if user and check_password_hash(user.senha_hash, senha):
            session['usuario_id'] = user.id
            return redirect(url_for('dashboard'))
        return 'Login inválido'
    return render_template('login.html')



@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        usuario = request.form['usuario']
        senha = generate_password_hash(request.form['senha'])
        if Usuario.query.filter_by(username=usuario).first():
            return 'Usuário já existe'
        novo = Usuario(username=usuario, senha_hash=senha)
        db.session.add(novo)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('cadastro.html')

@app.route('/dashboard') 
def dashboard():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))
    
    user = db.session.get(Usuario, session['usuario_id'])
    personagens = Personagem.query.filter_by(user_id=user.id).all()
    
    return render_template('dashboard.html', personagens=personagens, user=user.username)

@app.route('/criar_personagem', methods=['GET', 'POST']) 
def criar_personagem():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))
    user = db.session.get(Usuario, session['usuario_id'])

    if request.method == 'POST':
        personagem = Personagem(
            nome=request.form['nome'],
            forca=int(request.form['forca']),
            inteligencia=int(request.form['inteligencia']),
            agilidade=int(request.form['agilidade']),
            resistencia=int(request.form['resistencia']),
            arma=request.form['arma'],
            escudo=request.form['escudos'],
            armadura=request.form['armaduras'],
            capacete=request.form['capacetes'],
            cor=request.form['cor_pele'],
            user_id=session['usuario_id'],
            
        )
        db.session.add(personagem)
        db.session.commit()
        return redirect(url_for('dashboard'))

    return render_template('criar_personagem.html', user=user.username)

@app.route('/sair')
def sair():
    session.clear()
    return redirect(url_for('index'))

@app.route('/deletar_personagem/<int:id>', methods=['POST'])
def deletar_personagem(id):
    if 'usuario_id' not in session:
        return redirect(url_for('login'))

    personagem = Personagem.query.get_or_404(id)

    if personagem.user_id != session['usuario_id']:
        return "Acesso negado", 403

    db.session.delete(personagem)
    db.session.commit()
    return redirect(url_for('dashboard'))




# Criação do banco (só rodar uma vez no terminal interativo) 
with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)


