-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 25, 2020 at 07:00 AM
-- Server version: 8.0.17
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kasir`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id_barang` int(11) NOT NULL,
  `nama_barang` varchar(64) NOT NULL,
  `harga_jual` int(11) NOT NULL,
  `harga_beli` int(11) NOT NULL,
  `stok_barang` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id_barang`, `nama_barang`, `harga_jual`, `harga_beli`, `stok_barang`, `create_time`) VALUES
(1, 'Bimoli 2L', 26000, 20000, 300, '2020-07-17 07:43:57'),
(2, 'Bimoli 1L', 18000, 16000, 240, '2020-07-17 07:48:53'),
(3, 'Fortune 2L', 23000, 20500, 90, '2020-07-17 07:51:38'),
(4, 'Fortune 1L', 17000, 16000, 120, '2020-07-17 07:54:22'),
(5, 'Bimoli Botol 2L', 35000, 33500, 96, '2020-07-17 07:56:14'),
(6, 'Bimoli Botol 1L', 18000, 16900, 100, '2020-07-17 07:57:16'),
(7, 'Bimoli Jerigen 5 Ltr', 78000, 75000, 40, '2020-07-17 07:59:04'),
(8, 'Sunco 2L', 28700, 26500, 100, '2020-07-17 08:04:33'),
(9, 'Sunco 1L', 15000, 14500, 50, '2020-07-17 08:13:00'),
(10, 'Tropical 2L', 24000, 22000, 36, '2020-07-17 08:14:07'),
(11, 'Tropical 1L', 13000, 11500, 24, '2020-07-17 08:17:44'),
(12, 'Indomie Kari (Ktn)', 95000, 92500, 50, '2020-07-17 08:21:19'),
(13, 'Indomie Goreng (Ktn)', 95000, 92500, 54, '2020-07-17 08:22:21'),
(14, 'Mie Sedap Kari (Ktn)', 88000, 85000, 30, '2020-07-17 08:22:59'),
(15, 'Mie Sedap Goreng (Ktn)', 85000, 83500, 25, '2020-07-17 08:24:32'),
(16, 'Popmie Ayam (Ktn)', 88500, 86500, 12, '2020-07-17 08:29:41'),
(17, 'Popmie Kari Ayam(Ktn)', 100000, 95000, 8, '2020-07-17 08:37:15'),
(18, 'Popmie Baso (Ktn)', 90000, 88500, 15, '2020-07-17 08:42:28'),
(19, 'Beras Topi Koki 5kg', 65000, 59000, 30, '2020-07-17 08:45:19'),
(20, 'Beras Sania 5kg', 61500, 59500, 32, '2020-07-17 08:49:18'),
(21, 'Beras Hotel 5kg', 160500, 155000, 30, '2020-07-17 08:53:01'),
(22, 'Beras Topi Koki 10 kg', 148000, 145000, 30, '2020-07-17 08:57:13'),
(23, 'Beras Topi Koki PW 10 kg', 165000, 160000, 15, '2020-07-17 08:58:17'),
(24, 'Beras Topi Koki PW 5kg', 77500, 75000, 18, '2020-07-17 08:59:52'),
(25, 'Beras Cap Ayam Jago 5kg', 64000, 62500, 15, '2020-07-17 09:01:32'),
(26, 'Beras Cap Ayam Jago 10 kg', 135000, 130000, 12, '2020-07-17 09:02:08'),
(27, 'Tepung Roti Kobe 270gr', 12300, 11000, 55, '2020-07-17 09:04:04'),
(28, 'Tepung Roti Mamasuka 200gr', 20500, 18500, 25, '2020-07-17 09:06:35'),
(29, 'Tepung Roti Mamasuka 1kg', 52000, 46500, 38, '2020-07-17 09:07:47'),
(30, 'Tepung Segitiga Biru 1kg', 12000, 11300, 120, '2020-07-17 09:08:51'),
(31, 'Tepung Kunci Biru 1kg', 11500, 10000, 100, '2020-07-17 09:09:43'),
(32, 'Tepung Cakra Kembar 1kg', 11000, 10500, 150, '2020-07-17 09:10:33'),
(33, 'Gula Kuning Kiloan 1kg', 15000, 14500, 100, '2020-07-17 09:12:26'),
(34, 'Gula Putih Kiloan 1 kg', 16500, 15000, 250, '2020-07-17 09:13:57'),
(35, 'Gulaku Premium 1kg', 16000, 15000, 350, '2020-07-17 09:15:27'),
(36, 'Gulaku Kuning 1 kg', 13500, 12000, 180, '2020-07-17 09:16:05'),
(37, 'Rose Brand Gula Kristal 1kg', 12500, 10000, 100, '2020-07-17 09:16:41'),
(38, 'Rose Brand Gula Kuning 1kg', 14900, 13500, 85, '2020-07-17 09:17:29'),
(39, 'Le Mineral 600 ml', 42000, 40000, 50, '2020-07-17 09:29:25'),
(40, 'Le Mineral 330 ml', 34000, 32600, 45, '2020-07-17 09:31:18'),
(41, 'Aqua 1500 ml', 55000, 52500, 100, '2020-07-17 09:44:56'),
(42, 'Aqua 600 ml', 50000, 48000, 250, '2020-07-17 09:47:10'),
(43, 'Aqua 330 ml', 37000, 35000, 120, '2020-07-17 09:47:47'),
(44, 'Aqua 240 ml', 28000, 26500, 100, '2020-07-17 09:48:21'),
(45, 'Vit 240 ml', 17500, 16500, 65, '2020-07-17 09:53:43'),
(46, 'Vit 600 ml', 37000, 35000, 50, '2020-07-17 09:54:32'),
(47, 'Vit 1500ml', 40000, 37000, 40, '2020-07-17 09:55:59'),
(48, 'Ades 600ml', 60000, 56000, 40, '2020-07-17 09:56:55'),
(49, 'Ades 1500ml', 50000, 48000, 27, '2020-07-17 09:59:27'),
(50, 'Sirup ABC Squash Delight', 13000, 11900, 100, '2020-07-17 10:01:18'),
(51, 'Sirup ABC Cocopandan', 15000, 13500, 165, '2020-07-17 10:01:43'),
(52, 'Sirup ABC Melon', 13500, 12000, 180, '2020-07-17 10:04:07');

-- --------------------------------------------------------

--
-- Table structure for table `pembelian`
--

CREATE TABLE `pembelian` (
  `id_pembelian` int(11) NOT NULL,
  `nama_barang` varchar(64) NOT NULL,
  `jumlah_barang` int(11) NOT NULL,
  `total_harga` int(11) NOT NULL,
  `id_supplier` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penjualan`
--

CREATE TABLE `penjualan` (
  `id_penjualan` int(11) NOT NULL,
  `nama_barang` varchar(64) NOT NULL,
  `jumlah_barang` int(11) NOT NULL,
  `total_harga` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id_supplier` int(11) NOT NULL,
  `nama_supplier` varchar(64) NOT NULL,
  `alamat_supplier` varchar(128) NOT NULL,
  `no_hp` varchar(16) NOT NULL,
  `nama_bank` varchar(64) NOT NULL,
  `no_rekening` varchar(16) NOT NULL,
  `atas_nama` varchar(64) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id_supplier`, `nama_supplier`, `alamat_supplier`, `no_hp`, `nama_bank`, `no_rekening`, `atas_nama`, `create_time`) VALUES
(1, 'IndoGrosir', 'Jln.Soekarno Hatta no 120', '082392309767', 'BCA', '0441596651', 'PT.IndoGrosir', '2020-07-17 10:14:35'),
(2, 'Buana Abadi', 'Pergudangan Avian Blok E No.3E', '08127751451', 'BCA', '1445917667', 'Ilham Aziz', '2020-07-17 10:15:48'),
(3, 'Global Jaya Sembako', 'Pergudangan Siak Blok F No. 31F', '08114571457', 'Mandiri', '1080000899992', 'PT. Global Jaya Sembako', '2020-07-17 10:18:46');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `nama_user` varchar(64) NOT NULL,
  `level` varchar(16) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `nama_user`, `level`, `create_time`) VALUES
(1, 'admin', 'admin', 'Admin', 'Manajer', '2020-07-17 03:58:41'),
(2, 'winli', 'winli', 'Winli', 'Karyawan', '2020-07-17 04:02:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id_barang`);

--
-- Indexes for table `pembelian`
--
ALTER TABLE `pembelian`
  ADD PRIMARY KEY (`id_pembelian`),
  ADD KEY `id_supplier` (`id_supplier`),
  ADD KEY `id_barang` (`id_barang`);

--
-- Indexes for table `penjualan`
--
ALTER TABLE `penjualan`
  ADD PRIMARY KEY (`id_penjualan`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_barang` (`id_barang`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id_supplier`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `pembelian`
--
ALTER TABLE `pembelian`
  MODIFY `id_pembelian` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `penjualan`
--
ALTER TABLE `penjualan`
  MODIFY `id_penjualan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id_supplier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pembelian`
--
ALTER TABLE `pembelian`
  ADD CONSTRAINT `pembelian_ibfk_1` FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`id_supplier`),
  ADD CONSTRAINT `pembelian_ibfk_2` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`);

--
-- Constraints for table `penjualan`
--
ALTER TABLE `penjualan`
  ADD CONSTRAINT `penjualan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `penjualan_ibfk_2` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
