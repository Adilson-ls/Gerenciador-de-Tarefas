# 📋 Documentação do Projeto: Gerenciador de Tarefas (To-Do List)

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Curso](https://img.shields.io/badge/Curso-FrontEnd%20%26%20BackEnd-blue)

> **Curso:** Introdução à Programação Front-End e Back-End  
> **Atividade:** Desafio Prático da Etapa Primeiros Passos  
> **Desenvolvedor:** Adilson de Lima Santos

---

## 📑 Índice
1. [Introdução e Objetivo](#1-introdução-e-objetivo)
2. [Tecnologias Utilizadas](#2-tecnologias-utilizadas)
3. [Estrutura dos Arquivos](#3-estrutura-dos-arquivos)
4. [Funcionalidades Detalhadas](#4-funcionalidades-detalhadas)
5. [Instruções de Execução](#5-instruções-de-execução)
6. [Conclusão](#6-conclusão)

---

## 1. Introdução e Objetivo

Este projeto consiste no desenvolvimento de uma aplicação web interativa focada no gerenciamento de tarefas diárias (**To-Do List**). O objetivo principal foi criar uma solução prática e funcional que atendesse aos requisitos do desafio prático, demonstrando competência técnica nas tecnologias fundamentais da web.

A aplicação permite ao usuário:
- Adicionar novas tarefas.
- Marcar itens como concluídos.
- Excluir tarefas.
- Personalizar a visualização com o **modo claro/escuro**.

## 2. Tecnologias Utilizadas

Para atender aos critérios de avaliação que exigem a integração de múltiplas linguagens (Critério B), o projeto foi construído utilizando a tríade padrão do desenvolvimento Front-End:

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) **HTML5 (HyperText Markup Language):** Utilizado para a estruturação semântica do conteúdo (campos de entrada, botões, listas e a estrutura do alternador de temas).
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) **CSS3 (Cascading Style Sheets):** Responsável pela apresentação visual. Foram utilizadas **Variáveis CSS (`:root`)** para facilitar a implementação do sistema de temas (Dark Mode), Flexbox para layout responsivo e transições suaves.
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) **JavaScript (ES6+):** Fornece a interatividade e a lógica de negócios. O JavaScript manipula o DOM para gerenciar as tarefas e controla a troca de temas, salvando as preferências do usuário.

## 3. Estrutura dos Arquivos

A entrega deste desafio está organizada da seguinte forma dentro do arquivo compactado:

* `index.html`: Arquivo principal contendo a estrutura HTML, e, para fins de facilidade de execução e avaliação, contém também os blocos de `<style>` (CSS) e `<script>` (JS) integrados.
* `README.md`: Este arquivo de documentação detalhando o funcionamento e as decisões