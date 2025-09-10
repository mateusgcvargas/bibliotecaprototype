-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11/09/2025 às 00:56
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
-- Estrutura para tabela `emprestimos`
--

CREATE TABLE `emprestimos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id_livro` int(11) NOT NULL,
  `data_emprestimo` date NOT NULL,
  `data_vencimento` date NOT NULL,
  `status` enum('Devolvido','Não Devolvido','Vencido') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `emprestimos`
--

INSERT INTO `emprestimos` (`id`, `user_id`, `id_livro`, `data_emprestimo`, `data_vencimento`, `status`) VALUES
(18, 4, 12, '2025-09-09', '2025-09-23', 'Devolvido'),
(19, 4, 12, '2025-09-10', '2025-09-24', 'Devolvido'),
(20, 4, 10, '2025-09-10', '2025-09-24', 'Devolvido'),
(25, 5, 12, '2025-09-10', '2025-09-24', 'Não Devolvido');

-- --------------------------------------------------------

--
-- Estrutura para tabela `livros`
--

CREATE TABLE `livros` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `genero` varchar(50) NOT NULL,
  `ano` int(4) NOT NULL,
  `autor` varchar(50) NOT NULL,
  `status` enum('Disponível','Emprestado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `livros`
--

INSERT INTO `livros` (`id`, `nome`, `genero`, `ano`, `autor`, `status`) VALUES
(4, 'Dom Casmurro', 'Romance', 1899, 'Machado de Assis', 'Disponível'),
(5, 'O Senhor dos Anéis', 'Fantasia', 1954, 'J. R. R. Tolkien', 'Disponível'),
(6, 'Cem Anos de Solidão', 'Realismo Mágico', 1967, 'Gabriel García Márquez', 'Disponível'),
(7, 'A Revolução dos Bichos', 'Sátira', 1945, 'George Orwell', 'Disponível'),
(8, 'O Pequeno Príncipe', 'Infantil', 1943, 'Antoine de Saint-Exupéry', 'Disponível'),
(9, 'Harry Potter e a Pedra Filosofal', 'Fantasia', 1997, 'J. K. Rowling', 'Disponível'),
(10, '1984', 'Distopia', 1949, 'George Orwell', 'Disponível'),
(11, 'Moby Dick', 'Aventura', 1851, 'Herman Melville', 'Disponível'),
(12, 'Orgulho e Preconceito', 'Romance', 1813, 'Jane Austen', 'Emprestado');

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
(7, 'sza', 'sza@gmail.com'),
(8, 'sdasfdhsafh', 'fsafjsahfhjsk@gmail.com');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `emprestimos`
--
ALTER TABLE `emprestimos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id.livro` (`id_livro`),
  ADD KEY `id.user` (`user_id`);

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
-- AUTO_INCREMENT de tabela `emprestimos`
--
ALTER TABLE `emprestimos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de tabela `livros`
--
ALTER TABLE `livros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `emprestimos`
--
ALTER TABLE `emprestimos`
  ADD CONSTRAINT `id.livro` FOREIGN KEY (`id_livro`) REFERENCES `livros` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id.user` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
