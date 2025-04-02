// to colocando uns comentários aí que acho que vou terminar esse sistema depois de entregar, mas dei também uma explicada do que eu usei que não foi passado em aula
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path'); 
const app = express();
const secretKey = process.env.JWT_SECRET || 'MySecret'
const cookieParser = require('cookie-parser')
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

function verifyJWT(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login')
    }
    
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.redirect('/login')
        }
        req.user = decoded;
        next()
    });
}


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views','login.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views','login.html'));
});
app.post("/login",  (req,res)=>{
    const {user, password}  = req.body;
        if(user === 'fulano' && password === '1234'){
            const token = jwt.sign({user:user},secretKey,{expiresIn: 300}) 
            res.cookie('token', token, {httpOnly: true,  maxAge: 300000}) // coloquei 5 minutos de duração do cookie só, e esse método httpOnly é pra não ter como acessar pelo js do front pelo navegador, assim só dá pra acessar pelo lado do servidor
            console.log("Token gerado " + token);
            return res.sendFile(path.join(__dirname, 'views','principal.html'))    
        }else{
            res.status(500).json({message:'Login inválido!'})
        }
})

app.get("/principal", verifyJWT,(req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'principal.html'))
    //res.status(500).json({message:'Token não possuido ou errado!'}) 
    //essa linha acima foi só para testar se tava funcionando a permissão, se o senhor for testar só colocar como comentário lá na funcão verifyJWT os redirects, que aparece a menssagem de status, nem vou apagar pra caso eu teste depois ainda, mas ela é ínutil aqui porque a função redireciona direto pra pagina login
} )
app.get("/clientes", verifyJWT,(req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'clientes.html'))
})
// pra confirmar que o cookie ta sendo armazenado sem testes diretos do codigo, inspeciona a página no navegador e vai em aplicativo -> cookies -> localhost:3000 (ou qualquer que seja a porta se o senhor mudar aí), um teste que eu fiz aqui foi, ir lá e editar o valor do token porque ele permite, pra verificar se mudaria serverside, mas ta funcionando diretinho e ele ja redireciona pro /login






const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta 3000")
})