-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 24, 2026 at 07:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `surigaodelnortedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL,
  `num_of_guests` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `total_paid` decimal(10,2) NOT NULL,
  `ref_code` varchar(50) NOT NULL,
  `booked_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `user_id`, `tour_id`, `num_of_guests`, `booking_date`, `total_paid`, `ref_code`, `booked_at`) VALUES
(45, 1, 2, 2, '0012-11-12', 2910.00, 'SDN-OPWO76WX', '2026-06-23 18:06:43');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating_value` tinyint(4) NOT NULL,
  `review` text DEFAULT NULL,
  `rated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `booking_id`, `user_id`, `rating_value`, `review`, `rated_at`) VALUES
(19, 45, 1, 5, '', '2026-06-23 18:35:52');

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `tour_id` int(11) NOT NULL,
  `tour_name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`tour_id`, `tour_name`, `location`, `description`, `price`, `duration`, `image`) VALUES
(1, 'Tri-Island Tour + Corregidor Island', 'Guyam, Naked, Daku & Corregidor Island', 'Experience Siargao’s most iconic island-hopping adventure as you explore the pristine shores of Guyam Island, the unique sandbar of Naked Island, and the crystal-clear waters of Daku Island. Cap off your journey with a visit to Corregidor Island, known for its rolling hills, breathtaking panoramic views, and tranquil atmosphere perfect for nature lovers and photography enthusiasts.', 1999.00, 'Full Day', 'https://images.unsplash.com/photo-1698099843370-990862ece606?w=700&h=500&fit=crop&auto=format'),
(2, 'Tri-Island Tour + Secret Island', 'Guyam, Naked, Daku & Secret Island', 'Discover the beauty of Siargao’s famous island-hopping destinations, including the palm-fringed Guyam Island, the picturesque Naked Island sandbar, and the vibrant waters surrounding Daku Island. Complete your tropical escape with a visit to Secret Island, a hidden paradise during high tide that offers stunning coastal scenery away from the crowds.', 1299.00, 'Full Day', 'https://images.unsplash.com/photo-1565340076861-7a6667b36072?w=700&h=500&fit=crop&auto=format'),
(3, 'South Land Tour + Sugba Lagoon', 'Magpupungko, Sugba Lagoon, Maasin River & More', 'Embark on an unforgettable journey through Siargao’s southern wonders. Swim in the natural pools of Magpupungko Rock Pools, paddle across the emerald waters of Sugba Lagoon, and marvel at the famous bent palm tree along Maasin River. This tour also takes you to Secret Beach, Coconut Road + Coconut Mountain View, and other scenic spots that showcase the island’s breathtaking landscapes and laid-back charm.', 1799.00, 'Full Day', 'https://images.unsplash.com/photo-1565565915331-293fd8113954?w=700&h=500&fit=crop&auto=format'),
(4, 'North Land Tour', 'Alegria, Pacifico, Pasikon, Trogon’s Perch & More', 'Explore the less-traveled northern side of Siargao and uncover its hidden gems. From the serene shores of Alegria Beach, Pacifico Beach, and Pasikon Beach to the stunning viewpoints of Trogon’s Perch and Million Dollar View, this tour offers a perfect blend of nature, adventure, and relaxation. Visit Taktak waterfalls, Danjug caves, coastal Little Hawaii lookouts, and picturesque beaches while enjoying the authentic countryside atmosphere of Siargao.', 2800.00, 'Full Day', 'https://images.unsplash.com/photo-1622481227477-8db839366177?w=700&h=500&fit=crop&auto=format'),
(5, 'Sohoton Adventure by WOW Siargao', 'Sohoton Cove, Bucas Grande', 'Set sail on an extraordinary adventure to Sohoton Cove, one of the most breathtaking natural attractions in the region. Swim in the Stringless Jellyfish Sanctuary, venture into the enchanting Hagukan and Luminous Caves, and enjoy the pristine beauty of Tiktikan Resort and its surrounding waters. This tour is perfect for travelers seeking a mix of adventure, exploration, and unforgettable natural wonders.', 2499.00, 'Full Day', 'https://images.unsplash.com/photo-1622481227477-8db839366177?w=700&h=500&fit=crop&auto=format'),
(6, 'Sohoton Bucas Grande Tour', 'Sohoton Cove, Hagukan Cave, Tiktikan Lake & Socorro Island', 'Experience the best of Bucas Grande on an unforgettable island-hopping adventure. Cruise through the spectacular Sohoton Cove, explore the mystical Hagukan Cave, and admire the tranquil beauty of Tiktikan Lake. Encounter the famous stingless jellyfish in the Jellyfish Sanctuary, brave the exhilarating Dragon Slide and Diving Cave, and enjoy the picturesque landscapes of Socorro Island for a day filled with adventure and natural wonders.', 2499.00, 'Full Day', 'https://images.unsplash.com/photo-1736776256236-b9bbaafa3992?w=700&h=500&fit=crop&auto=format'),
(7, 'Sohoton Tour', 'Sohoton Cove, Tiktikan Lake, Hagukan, Bolitas & Crystal Caves', 'Discover the hidden treasures of Sohoton Cove through a journey of caves, lagoons, and pristine waters. From the tranquil Tiktikan Lake and the renowned Jellyfish Sanctuary to the awe-inspiring Hagukan, Bolitas, Crystal, and Diving Caves, every stop offers a unique glimpse into the area\'s natural beauty. End the day at Club Tara, surrounded by breathtaking scenery and the peaceful charm of Bucas Grande.', 2799.00, 'Full Day', 'https://images.unsplash.com/photo-1736776256319-50153ce32dfc?w=700&h=500&fit=crop&auto=format');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`, `created_at`) VALUES
(1, 'Melvin John Delen', 'melvindelen04@gmail.com', '$2y$10$SvHnllKp8BawVldcbZyfMObyUNBr1yAowFjnf3vwXJ.018.RJTL.K', '2026-06-23 18:14:44'),
(2, 'fasd', 'afsdfa', '$2y$10$e9A8dMOz6QN3VLqbbKLhuO8QTbeSHKjaB0sWB49zNh0hpZpHgPqOe', '2026-06-23 19:06:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `tour_id` (`tour_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_booking_rating` (`booking_id`);

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`tour_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `tour_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`tour_id`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `fk_ratings_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
