-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 03/09/2025 às 00:24
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `skaianet2`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `livros`
--

CREATE TABLE `livros` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `genero` varchar(50) NOT NULL,
  `ano` int(4) NOT NULL,
  `autor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `livros`
--

INSERT INTO `livros` (`id`, `nome`, `genero`, `ano`, `autor`) VALUES
(4, 'Dom Casmurro', 'Romance', 1899, 'Machado de Assis'),
(5, 'O Senhor dos Anéis', 'Fantasia', 1954, 'J. R. R. Tolkien'),
(6, 'Cem Anos de Solidão', 'Realismo Mágico', 1967, 'Gabriel García Márquez'),
(7, 'A Revolução dos Bichos', 'Sátira', 1945, 'George Orwell'),
(8, 'O Pequeno Príncipe', 'Infantil', 1943, 'Antoine de Saint-Exupéry'),
(9, 'Harry Potter e a Pedra Filosofal', 'Fantasia', 1997, 'J. K. Rowling'),
(10, '1984', 'Distopia', 1949, 'George Orwell'),
(11, 'Moby Dick', 'Aventura', 1851, 'Herman Melville'),
(12, 'Orgulho e Preconceito', 'Romance', 1813, 'Jane Austen'),
(13, 'O Código Da Vinci', 'Suspense', 2003, 'Dan Brown');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`) VALUES
(1, 'mateus', 'yataaa892@gmail.com'),
(4, 'mateus', 'mateusgabrielcarvalhovargas@gmail.com'),
(5, 'Admin', 'yataaa82@gmail.com'),
(6, 'mateus', 'mateusgabrielcarvalhovargas@gmail.com'),
(7, 'sza', 'sza@gmail.com');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `livros`
--
ALTER TABLE `livros`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `livros`
--
ALTER TABLE `livros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
