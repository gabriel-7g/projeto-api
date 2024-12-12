const express = require('express');
const db = require('./conexao');

// Criar o app NodeJS
const app = express();
app.use(express.json());

//Rodar Servidor
const porta = 3000;
app.listen(porta, ()=> {
    console.log("Servidor executando na porta 3000");
});

//Consultar a vw_tudo
app.get('/pessoas', (req, res) => {

    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave Inválida!!"})
    }

    const sql = "SELECT * FROM tb_colaboradores";
    db.query(sql, (erro, resultados) =>{
        if(erro){
            return res.json({mensagem: "Falha ao consultar" +erro.message})
        }
        return res.json(resultados);
    });
});

//Consultar Ativos vw_tudo
app.get('/pessoas/ativos', (req, res) => {

    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave Inválida!!"})
    }

    const sql = "SELECT * FROM vw_tudo WHERE situacao = 'Ativo'";
    db.query(sql, (erro, resultados) =>{
        if(erro){
            return res.json({mensagem: "Falha ao consultar" +erro.message})
        }
        return res.json(resultados);
    });
});

//Consultar Inativos vw_tudo
app.get('/pessoas/inativos', (req, res) => {

    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave Inválida!!"})
    }

    const sql = "SELECT * FROM vw_tudo WHERE situacao = 'Inativo'";
    db.query(sql, (erro, resultados) =>{
        if(erro){
            return res.json({mensagem: "Falha ao consultar" +erro.message})
        }
        return res.json(resultados);
    });
});



//Cadastrar Pessoas
app.post('/pessoas', (req, res) =>{
    const {nome, situacao, fk_funcao} = req.body;
    const sql = "INSERT INTO tb_colaboradores (nome, situacao, fk_funcao) VALUES (?, ?, ?)";
    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave Inválida!!"})
    }
    db.query(sql, [nome, situacao, fk_funcao], (erro,resultados)=>{
        if(erro){
            return res.json({mensagem: "Falha ao Cadastrar: " +erro.message})
        }
        return res.json({mensagem: "Cadastrado com sucesso "})
    });
});

//Consultar Cargos
app.get('/funcoes', (req, res) => {

    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave Inválida!!"})
    }

    const sql = "SELECT cargo FROM tb_funcoes;";
    db.query(sql, (erro, resultados) =>{
        if(erro){
            return res.json({mensagem: "Falha ao consultar" +erro.message})
        }
        return res.json(resultados);
    });
});

//Cadastrar cargos
app.post('/funcoes', (req, res) =>{
    const {cargo} = req.body;
    const sql = "INSERT INTO tb_funcoes (cargo) VALUES (?)";
    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave Inválida!!"})
    }
    db.query(sql, [cargo], (erro,resultados)=>{
        if(erro){
            return res.json({mensagem: "Falha ao Cadastrar: " +erro.message})
        }
        return res.json({mensagem: "Cadastrado com sucesso "})
    });
});

//Deletar Pessoas
app.delete("/pessoas/:id", (req, res) =>{
    const id_informado = req.params.id;
    const sql = 'DELETE FROM tb_colaboradores WHERE matricula = ?';
    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave Inválida!!"})
    }
    db.query(sql, [id_informado], (erro, resultados) => {
        if(erro){
            return res.json({mensagem: "Falha ao deletar" +erro.message})
        }
        if(resultados.length == 0 ){
            return res.json({mensagem: "Nada alterado"})
        }
        res.json({mensagem: "Deletado com sucesso"})
    })
});//Fim da rota deletar

//Deletar Funções
app.delete("/funcoes/:id", (req, res) =>{
    const id_informado = req.params.id;
    const sql = 'DELETE FROM tb_funcoes WHERE cod_funcao = ?';
    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave Inválida!!"})
    }
    db.query(sql, [id_informado], (erro, resultados) => {
        if(erro){
            return res.json({mensagem: "Falha ao deletar" +erro.message})
        }
        if(resultados.length == 0 ){
            return res.json({mensagem: "Nada alterado"})
        }
        res.json({mensagem: "Deletado com sucesso"})
    })
});

//Atualizar funcoes
app.put('/funcoes', (req, res) =>{
    const {cargo, cod_funcao} = req.body;
    const sql = "UPDATE tb_funcoes SET cargo = ? WHERE cod_funcao = ?";
    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave Inválida!!"})
    }
    db.query(sql, [cargo, cod_funcao], (erro,resultados)=>{
        if(erro){
            return res.json({mensagem: "Falha ao Atualizar: " +erro.message})
        }
        if(resultados.length == 0 ){
            return res.json({mensagem: "Nada alterado"})
        }
        return res.json({mensagem: "Atualizado com sucesso "})
    });
});

//Atualizar Pessoas
app.put('/pessoas', (req, res) =>{
    const {nome, situacao, fk_funcao, matricula} = req.body;
    const sql = "UPDATE tb_colaboradores SET nome = ?, fk_funcao = ?, situacao = ? WHERE matricula = ?";
    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave Inválida!!"})
    }
    db.query(sql, [nome, situacao, fk_funcao, matricula], (erro,resultados)=>{
        if(erro){
            return res.json({mensagem: "Falha ao Atualizar: " +erro.message})
        }
        if(resultados.length == 0 ){
            return res.json({mensagem: "Nada alterado"})
        }
        return res.json({mensagem: "Atualizado com sucesso "})
    });
});