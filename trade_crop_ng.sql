-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 11, 2022 at 11:48 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trade_crop_ng`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` int(11) DEFAULT '0',
  `request_id` varchar(250) NOT NULL,
  `price_quantity` decimal(20,2) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `product_id`, `user_id`, `quantity`, `status`, `request_id`, `price_quantity`, `seller_id`, `created_at`, `updated_at`) VALUES
(10, 13, 2, 3, 2, '16654390441821449273', '1500.00', 1, '2022-10-10 20:57:24', '2022-10-11 13:55:15'),
(11, 9, 2, 3, 2, '16654390441821449273', '300.00', 1, '2022-10-10 20:57:33', '2022-10-11 13:55:15'),
(12, 13, 2, 4, 2, '16654390441821449273', '2000.00', 1, '2022-10-11 09:50:24', '2022-10-11 13:55:15'),
(13, 7, 2, 3, 2, '16654390441821449273', '6000.00', 1, '2022-10-11 09:50:33', '2022-10-11 13:55:15'),
(14, 13, 2, 4, 2, '16655001791529834532', '2000.00', 1, '2022-10-11 13:56:19', '2022-10-11 13:56:43'),
(15, 11, 2, 3, 2, '1665500264524667499', '10500.00', 1, '2022-10-11 13:57:44', '2022-10-11 13:58:39'),
(16, 12, 2, 2, 2, '16655004721231475404', '6000.00', 1, '2022-10-11 14:01:12', '2022-10-11 14:01:33'),
(17, 10, 2, 3, 2, '16655007121449790597', '1050.00', 1, '2022-10-11 14:05:12', '2022-10-11 14:05:38'),
(18, 12, 2, 3, 2, '1665508309944353438', '9000.00', 1, '2022-10-11 16:11:49', '2022-10-11 16:12:17'),
(19, 13, 2, 2, 1, '166552360149253068', '1000.00', 1, '2022-10-11 20:26:41', '2022-10-11 20:32:45'),
(20, 13, 2, 2, 1, '1665524432842916621', '1000.00', 1, '2022-10-11 20:40:32', '2022-10-11 20:40:32'),
(21, 4, 2, 2, 1, '1665524432842916621', '100.00', 1, '2022-10-11 20:40:42', '2022-10-11 20:44:37'),
(22, 10, 2, 2, 1, '1665524432842916621', '700.00', 1, '2022-10-11 20:40:51', '2022-10-11 20:43:43'),
(23, 13, 2, 1, 2, '16655249561088935079', '500.00', 1, '2022-10-11 20:49:16', '2022-10-11 20:53:40'),
(24, 12, 2, 1, 2, '16655249561088935079', '3000.00', 1, '2022-10-11 20:49:22', '2022-10-11 20:52:20'),
(25, 4, 2, 1, 1, '16655249561088935079', '50.00', 1, '2022-10-11 20:49:27', '2022-10-11 20:50:21'),
(26, 12, 2, 1, 2, '16655249561088935079', '3000.00', 1, '2022-10-11 20:53:27', '2022-10-11 20:53:40'),
(27, 13, 2, 2, 1, '1665525238321915296', '1000.00', 1, '2022-10-11 20:53:58', '2022-10-11 20:54:56'),
(28, 2, 2, 2, 1, '1665525238321915296', '1000.00', 1, '2022-10-11 20:54:06', '2022-10-11 20:54:56'),
(29, 14, 2, 1, 1, '1665525238321915296', '700.00', 1, '2022-10-11 20:54:12', '2022-10-11 20:54:56'),
(30, 14, 2, 1, 1, '16655280121271390490', '700.00', 1, '2022-10-11 21:40:12', '2022-10-11 21:41:17'),
(31, 7, 2, 1, 1, '16655280121271390490', '2000.00', 1, '2022-10-11 21:40:19', '2022-10-11 21:41:17'),
(32, 4, 2, 1, 1, '16655280121271390490', '50.00', 1, '2022-10-11 21:40:26', '2022-10-11 21:41:17');

-- --------------------------------------------------------

--
-- Table structure for table `crops`
--

CREATE TABLE `crops` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `img` varchar(250) NOT NULL,
  `category_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `price_per` varchar(250) NOT NULL,
  `price` decimal(20,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `crops`
--

INSERT INTO `crops` (`id`, `name`, `img`, `category_id`, `user_id`, `price_per`, `price`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 'Apple', 'apple_1665417161.jpeg', 1, 1, 'unit', '100.00', 30, '2022-10-10 14:52:41', '2022-10-10 14:52:41'),
(2, 'Mango', 'mango_1665417209.jpeg', 1, 1, 'unit', '500.00', 50, '2022-10-10 14:53:29', '2022-10-10 14:53:29'),
(4, 'Orange 2', 'orange_1665420017.jpeg', 1, 1, 'unit', '50.00', 39, '2022-10-10 15:40:17', '2022-10-11 21:41:17'),
(5, 'feed1', 'feed_crop1_1665423763.jpeg', 2, 1, 'bag', '4000.00', 10, '2022-10-10 16:42:43', '2022-10-10 16:42:43'),
(6, 'feed2', 'feed_crop2_1665423801.jpeg', 2, 1, 'bag', '6000.00', 20, '2022-10-10 16:43:21', '2022-10-10 16:43:21'),
(7, 'Fiber1', 'fiber1_1665423990.jpeg', 3, 1, 'tonne', '2000.00', 200, '2022-10-10 16:46:30', '2022-10-10 16:46:30'),
(8, 'fiber2', 'fiber2_1665424125.jpeg', 3, 1, 'tonne', '3000.00', 1000, '2022-10-10 16:48:45', '2022-10-10 16:48:45'),
(9, 'Oil Crop', 'oil_crop_1665424301.jpeg', 4, 1, 'kg', '100.00', 25000, '2022-10-10 16:51:41', '2022-10-10 16:51:41'),
(10, 'Oil Palm', 'oil_palm_1665424360.jpeg', 4, 1, 'kg', '350.00', 40000, '2022-10-10 16:52:40', '2022-10-10 16:52:40'),
(11, 'Ornamental1', 'ornamental1_1665424485.jpeg', 5, 1, 'bag', '3500.00', 2000, '2022-10-10 16:54:45', '2022-10-10 16:54:45'),
(12, 'Ornamental2', 'ornamental2_1665424523.jpeg', 5, 1, 'bag', '3000.00', 500, '2022-10-10 16:55:23', '2022-10-10 16:55:23'),
(13, 'Tobacco', 'tobacco_1665424638.jpeg', 6, 1, 'kg', '500.00', 50000, '2022-10-10 16:57:18', '2022-10-10 16:57:18'),
(14, 'Soya', 'soya_1665424674.jpg', 6, 1, 'kg', '700.00', 60000, '2022-10-10 16:57:54', '2022-10-10 16:57:54');

-- --------------------------------------------------------

--
-- Table structure for table `crop_categories`
--

CREATE TABLE `crop_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `class_tags` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `crop_categories`
--

INSERT INTO `crop_categories` (`id`, `name`, `description`, `class_tags`, `created_at`, `updated_at`) VALUES
(1, 'Food Crops', 'Such as Vegetables, fruits, rice harvested for human consumption', 'food_crops', '2022-10-10 10:48:37', '2022-10-10 10:48:37'),
(2, 'Feed Crops', 'such as oats and alfalfa harvested for livestock consumption', 'feed_crops', '2022-10-10 10:51:19', '2022-10-10 10:51:19'),
(3, 'Fiber Crops', 'such as cotton & hemps harvested for textile and paper production', 'fiber_crops', '2022-10-10 10:51:19', '2022-10-10 10:51:19'),
(4, 'Oil Crops', 'such as canola & corn harvested for consumption or industrial uses', 'oil_crops', '2022-10-10 10:51:19', '2022-10-10 10:51:19'),
(5, 'Ornamental Crops', 'such as dogwood & azalea, are harvested for landscape gardening', 'ornamental_crops', '2022-10-10 10:53:40', '2022-10-10 10:53:40'),
(6, 'Industrial Crops', 'Such as rubber and tobacco harvested for their products` use in factories or machines', 'industrial_crops', '2022-10-10 10:53:40', '2022-10-10 10:53:40');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `cart_request_id` varchar(250) NOT NULL,
  `total_items` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `product_id`, `quantity`, `seller_id`, `buyer_id`, `transaction_id`, `status`, `cart_request_id`, `total_items`, `created_at`, `updated_at`) VALUES
(1, 13, 2, 1, 2, 7, 0, '166552360149253068', 1, '2022-10-11 20:32:45', '2022-10-11 20:32:45'),
(2, 10, 2, 1, 2, 8, 0, '1665524432842916621', 2, '2022-10-11 20:43:43', '2022-10-11 20:43:43'),
(3, 4, 2, 1, 2, 9, 0, '1665524432842916621', 2, '2022-10-11 20:44:37', '2022-10-11 20:44:37'),
(4, 4, 1, 1, 2, 10, 0, '16655249561088935079', 1, '2022-10-11 20:50:21', '2022-10-11 20:50:21'),
(5, 14, 1, 1, 2, 13, 0, '1665525238321915296', 1, '2022-10-11 20:54:56', '2022-10-11 20:54:56'),
(6, 4, 1, 1, 2, 14, 0, '16655280121271390490', 3, '2022-10-11 21:41:17', '2022-10-11 21:41:17');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cart_reference` varchar(250) NOT NULL,
  `status` int(11) NOT NULL,
  `tx_ref` varchar(250) NOT NULL,
  `item_count` int(11) NOT NULL,
  `total` decimal(20,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `cart_reference`, `status`, `tx_ref`, `item_count`, `total`, `created_at`, `updated_at`) VALUES
(1, 2, '1665500264524667499', 2, '8e0e55cd-923a-4268-8f66-331d137decc1', 0, '0.00', '2022-10-11 13:58:39', '2022-10-11 13:58:39'),
(2, 2, '16655004721231475404', 2, '07bfef80-0fb1-4b15-8156-03fb9a00394c', 0, '0.00', '2022-10-11 14:01:33', '2022-10-11 14:01:33'),
(3, 2, '16655007121449790597', 2, 'fc2bb87f-72af-4e35-8efa-adb3817d69e5', 1, '0.00', '2022-10-11 14:05:38', '2022-10-11 14:05:38'),
(4, 2, '1665508309944353438', 2, '5908e461-e0bf-4f6c-bf84-3d14681f917d', 1, '0.00', '2022-10-11 16:12:17', '2022-10-11 16:12:17'),
(5, 2, '166552360149253068', 1, '30a9966d-eb3e-4fe9-b323-ed0b525e1228', 1, '0.00', '2022-10-11 20:28:28', '2022-10-11 20:28:28'),
(6, 2, '166552360149253068', 1, 'd22fb0da-1ec6-4771-bf3e-80ee459af1b7', 1, '0.00', '2022-10-11 20:30:04', '2022-10-11 20:30:04'),
(7, 2, '166552360149253068', 1, 'd22fb0da-1ec6-4771-bf3e-80ee459af1b7', 1, '0.00', '2022-10-11 20:32:45', '2022-10-11 20:32:45'),
(8, 2, '1665524432842916621', 1, 'feafd1a4-84a6-4202-9c20-01d24dc35887', 3, '0.00', '2022-10-11 20:43:43', '2022-10-11 20:43:43'),
(9, 2, '1665524432842916621', 1, '41b04cdb-4dc1-4e8c-99eb-a8bda2019fa4', 2, '0.00', '2022-10-11 20:44:37', '2022-10-11 20:44:37'),
(10, 2, '16655249561088935079', 1, 'fcbf1492-90ff-4e03-9b3b-49f28bc6c4b0', 3, '0.00', '2022-10-11 20:50:21', '2022-10-11 20:50:21'),
(11, 2, '16655249561088935079', 2, '64f5805c-6255-42e7-bf7a-8e9a99194456', 2, '0.00', '2022-10-11 20:52:20', '2022-10-11 20:52:20'),
(12, 2, '16655249561088935079', 2, 'b05a9333-7c58-4637-b9dc-37ef3fb84357', 2, '0.00', '2022-10-11 20:53:40', '2022-10-11 20:53:40'),
(13, 2, '1665525238321915296', 1, 'e3b41d79-4b25-466f-a536-ccb8f7a18e15', 3, '0.00', '2022-10-11 20:54:56', '2022-10-11 20:54:56'),
(14, 2, '16655280121271390490', 1, 'd097b979-fe11-447f-acc8-b8d008a54404', 3, '2750.00', '2022-10-11 21:41:17', '2022-10-11 21:41:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type` enum('0','1','2') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '0 = Admin, 1 = seller, 2 = buyer',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `user_type`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'mradelusi', 'mradelusi@gmail.com', NULL, '$2y$10$EFdkrvPdEmf1dVJR8VQyJOXQxhAI3Pzmhn2S8kDF/4H2qmZ4WydJa', '1', NULL, '2022-10-10 09:23:36', '2022-10-10 09:23:36'),
(2, 'Motolani Adelusi', 'tolani_adelusi@yahoo.com', NULL, '$2y$10$TbInFogkihi/EGv39pzdbON9soQ4.IlVIy.k8Js.4bB5Rr19/518q', '2', NULL, '2022-10-10 15:52:33', '2022-10-10 15:52:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `crops`
--
ALTER TABLE `crops`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `crop_categories`
--
ALTER TABLE `crop_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `cart_id` (`cart_reference`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `crops`
--
ALTER TABLE `crops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `crop_categories`
--
ALTER TABLE `crop_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
