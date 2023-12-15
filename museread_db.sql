-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 15, 2023 at 03:00 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `museread_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `type` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `provider_account_id` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `expires_at` int(11) DEFAULT NULL,
  `token_type` varchar(255) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `id_token` text,
  `session_state` varchar(255) DEFAULT NULL,
  `user_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `authorbooks`
--

CREATE TABLE `authorbooks` (
  `bookId` int(11) NOT NULL,
  `authorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authorbooks`
--

INSERT INTO `authorbooks` (`bookId`, `authorId`) VALUES
(1, 1),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 10),
(9, 11),
(10, 12),
(11, 13),
(12, 14),
(13, 15);

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `fullname`) VALUES
(1, 'Chinua Achebe'),
(2, 'Max Lobe'),
(3, 'Efua Traoré'),
(4, 'Reni K Amayo'),
(5, 'T.L Huchu'),
(6, 'Suyi Davies Okungbowa'),
(7, 'Namina Forna'),
(8, 'Ayòbámi Adébáyò'),
(9, 'Dipo Faloyin'),
(10, 'Akwaeke Emezi'),
(11, 'Gothataone Moeng'),
(12, 'Arinze Ifeakandu'),
(13, 'Chimamanda Ngozi Adichie'),
(14, 'Yaa Gyasi'),
(15, 'Shirlene Obuobi');

-- --------------------------------------------------------

--
-- Table structure for table `bookgenres`
--

CREATE TABLE `bookgenres` (
  `bookId` int(11) NOT NULL,
  `genreId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookgenres`
--

INSERT INTO `bookgenres` (`bookId`, `genreId`) VALUES
(1, 1),
(11, 1),
(12, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(1, 3),
(1, 4),
(10, 4),
(1, 5),
(3, 5),
(4, 5),
(5, 5),
(6, 5),
(7, 5),
(8, 5),
(1, 6),
(9, 6),
(10, 6),
(11, 6),
(12, 6),
(1, 7),
(2, 7),
(4, 7),
(5, 7),
(6, 7),
(7, 7),
(8, 7),
(10, 7),
(11, 7),
(12, 7),
(13, 7),
(3, 9),
(9, 9),
(2, 10),
(3, 10),
(4, 10),
(5, 10),
(6, 10),
(8, 10),
(2, 11),
(3, 11),
(4, 11),
(5, 11),
(6, 11),
(2, 12),
(6, 12),
(7, 12),
(8, 12),
(9, 12),
(10, 12),
(11, 12),
(12, 12),
(13, 12),
(2, 13),
(3, 13),
(4, 13),
(5, 13),
(3, 14),
(6, 14),
(8, 14),
(7, 15),
(7, 16),
(9, 16),
(11, 16),
(12, 16),
(7, 17),
(9, 17),
(11, 17),
(12, 17),
(8, 18),
(10, 18),
(9, 20),
(10, 20);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `imgUrl` text NOT NULL,
  `description` text NOT NULL,
  `pages` double NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `imgUrl`, `description`, `pages`, `createdAt`) VALUES
(1, 'Things Fall Apart', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1699897304/ivee_images/i4xnfxuy9c3imqkm67eb.jpg', '\"Things Fall Apart\" by Chinua Achebe is a novel set in 19th-century Nigeria. It follows Okonkwo, a respected village leader, and examines the effects of British colonialism and Christian influence on the Igbo society. The story addresses themes of tradition, change, and conflict between indigenous and colonial values.', 209, '2023-11-13 17:41:45'),
(2, 'Children of the Quicksands', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700050815/ivee_images/d1wjr2luiopyv85menev.jpg', 'In a remote Nigerian village, twelve-year-old Simi is desperate to uncover a family secret. But it\'s when she\'s caught in the red quicksand of a forbidden lake that her adventure truly begins. Can she bring her family back together and restore peace to the village?', 288, '2023-11-15 12:20:15'),
(3, 'Descendants of the First', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700050958/ivee_images/z8ffkexgw5z5hm1gfnkj.jpg', 'The king is dead - and with him, the last thread holding the kingdom together. \n Deep cracks are forming throughout the kingdom of Nri with whispers of deadly successors lurking beneath the shadows. Despite having the same face, it seems the deepest crack is forming between Naala and Sinai, the reunited twin goddesses, who must put their differences aside as they travel through a broken Nri. \n With the king dead, the reunited twin goddesses must now face mythical beasts, a volatile resurgence of the lost gods and unseen enemies as they fight to prevent the kingdom from tearing itself apart. \n Descendants of the First is the thundering sequel to Reni K Amayo\'s epic feminist young adult fantasy, Daughters of Nri, lauded as \"literary magic\" by Buzzfeed and a piece of \"Excellent writing, brilliant book\" by bestselling author, Dorothy Koomson.', 337, '2023-11-15 12:22:38'),
(4, 'The Library of the Dead', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700051098/ivee_images/tbt8i4jgmf3wzbrau9ak.jpg', 'Sixth Sense meets Stranger Things in T. L. Huchu\'s The Library of the Dead, a sharp contemporary fantasy following a precocious and cynical teen as she explores the shadowy magical underside of modern Edinburgh.\nWhen a child goes missing in Edinburgh\'s darkest streets, young Ropa investigates. She\'ll need to call on Zimbabwean magic as well as her Scottish pragmatism to hunt down clues. But as shadows lengthen, will the hunter become the hunted? \nWhen ghosts talk, she will listen...\n\nRopa dropped out of school to become a ghostalker. Now she speaks to Edinburgh\'s dead, carrying messages to the living. A girl\'s gotta earn a living, and it seems harmless enough. Until, that is, the dead whisper that someone\'s bewitching children--leaving them husks, empty of joy and life. It\'s on Ropa\'s patch, so she feels honor-bound to investigate. But what she learns will change her world. \nShe\'ll dice with death (not part of her life plan...), discovering an occult library and a taste for hidden magic. She\'ll also experience dark times. For Edinburgh hides a wealth of secrets, and Ropa\'s gonna hunt them all down.', 336, '2023-11-15 12:24:58'),
(5, 'Son of the Storm', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700051244/ivee_images/mdbtrcu9fhhtngdnpz4p.jpg', 'In a fantasy world inspired by pre-colonial West Africa, the story revolves around Danso, a scholar in the ancient city of Bassa who is uninterested in the greatness his academic path promises. He\'s more fascinated by the forbidden tales about what lies beyond the city walls, despite the elite\'s claims that there\'s nothing outside and the immigrants\' oath of silence. Danso\'s life takes a dramatic turn when he encounters a warrior with magical abilities, which are believed not to exist. This discovery thrusts him into a confrontation with the hidden, dark secrets of Bassa. As he embarks on a journey beyond the city, he uncovers a history that has been concealed, and the repercussions of his findings pose a threat to the empire\'s very existence.', 480, '2023-11-15 12:27:24'),
(6, 'The Gilded Ones', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700051374/ivee_images/krdq80su00pkgs1l1iwe.jpg', 'In this world, girls are outcasts by blood and warriors by choice. \nSixteen-year-old Deka lives in fear and anticipation of the blood ceremony that will determine whether she will become a member of her village. Already different from everyone else because of her unnatural intuition, Deka prays for red blood so she can finally feel like she belongs. \nBut on the day of the ceremony, her blood runs gold, the color of impurity-and Deka knows she will face a consequence worse than death. \nThen a mysterious woman comes to her with a choice: stay in the village and submit to her fate, or leave to fight for the emperor in an army of girls just like her. They are called alaki--near-immortals with rare gifts. And they are the only ones who can stop the empire\'s greatest threat. \nKnowing the dangers that lie ahead yet yearning for acceptance, Deka decides to leave the only life she\'s ever known. But as she journeys to the capital to train for the biggest battle of her life, she will discover that the great walled city holds many surprises. Nothing and no one are quite what they seem to be-not even Deka herself.', 418, '2023-11-15 12:29:34'),
(7, 'A Spell of Good Things', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700052144/ivee_images/hehjkjepqvv59bszome2.jpg', 'A spellbinding novel about family secrets and bonds, thwarted hope and the brutal realities of life in a society rife with inequality, from the Women’s Prize shortlisted author\n\nAyọ̀bámi Adébáyọ̀, the Women’s Prize shortlisted author of Stay With Me, unveils a dazzling story of modern Nigeria and two families caught in the riptides of wealth, power, romantic obsession and political corruption.\n\nEniola is tall for his age, a boy who looks like a man. His father has lost his job, so Eniola spends his days running errands for the local tailor, collecting newspapers and begging, dreaming of a big future.\n\nWuraola is a golden girl, the perfect child of a wealthy family. Now an exhausted young doctor in her first year of practice, she is beloved by Kunle, the volatile son of family friends.\n\nWhen a local politician takes an interest in Eniola and sudden violence shatters a family party, Wuraola and Eniola’s lives become intertwined. In this breathtaking novel, Ayọ̀bámi Adébáyọ̀ shines her light on Nigeria, on the gaping divide between the haves and the have-nots, and the shared humanity that lives in between.', 332, '2023-11-15 12:42:24'),
(8, 'Bitter', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700052226/ivee_images/rbyjdmbwva0bhyygr5xk.jpg', 'From the critically acclaimed author of Pet and The Death of Vivek Oji, Bitter, a companion novel to Pet, takes a timely and riveting look at the power of youth, protest and art.\n\nBitter is thrilled to have been chosen to attend Eucalyptus, a special school where she can focus on her painting surrounded by other creative teens. But outside this haven, the streets are filled with protests against the deep injustices that grip the town of Lucille.\n\nBitter\'s instinct is to stay safe within the walls of Eucalyptus . . . but her friends aren\'t willing to settle for a world that the adults say is \"just the way things are.\" Pulled between old friendships, her creative passion, and a new a romance, Bitter isn\'t sure where she belongs - in the art studio or in the streets. And if she does find a way to help the revolution while being true to who she is, she must also ask: at what cost?', 224, '2023-11-15 12:43:46'),
(9, 'Call and Response', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700052311/ivee_images/uutcjy7idzlozu6sdal4.jpg', 'Richly drawn stories about the lives of ordinary families in contemporary Botswana as they navigate relationships, tradition and caretaking in a rapidly changing world.\n\nA young widow adheres to the expectations of wearing mourning clothes for nearly a year, though she’s unsure what the traditions mean or whether she is ready to meet the world without their protection. An older sister returns home from a confusing time in America, only to explain at every turn why she’s left the land of opportunity. A younger sister hides her sexual exploits from her family, while her older brother openly flaunts his infidelity.\n\nThe stories collected in Call and Response are strongly anchored in place—in the village of Serowe, where the author is from, and in Gaborone, the capital city of Botswana—charting the emotional journeys of women seeking love and opportunity beyond the barriers of custom and circumstance.\n\nGothataone Moeng is part of a new generation of writers coming out of Africa whose voices are ready to explode onto the literary scene. In the tradition of writers like Chimamanda Adiche and Jhumpa Lahiri, she offers us insight into communities, experiences and landscapes through stories that are cinematic in their sweep, with unforgettable female protagonists.', 289, '2023-11-15 12:45:11'),
(10, 'God\'s Children are Little Broken Things', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700052424/ivee_images/eecai8ogwuegszlbxqjy.jpg', 'In this stunning debut from one of Nigeria\'s most exciting young writers, the stakes of love meet a society in flux. These nine stories of queer male intimacy brim with simmering secrecy, ecstasy, loneliness, and love in their depictions of what it means to be gay in contemporary Nigeria. A man revisits the university campus where he lost his first love, aware now of what he couldn\'t understand then. A daughter returns home to Lagos after the death of her father, where she must face her past--and future--relationship with his longtime partner. A young musician rises to fame at the price of pieces of himself, and the man who loves him. Generations collide, families break and are remade, languages and cultures intertwine, and lovers find their ways to futures. From childhood through adulthood, on university campuses, city centers, and neighborhoods where church bells mingle with the morning call to prayer, love is consistent even in the presence of loss. God\'s Children Are Little Broken Things from Caine Prize finalist Arinze Ifeakandu is a debut of emotional charge, with the touch of grace and the compassionate signature of an important new voice.', 224, '2023-11-15 12:47:05'),
(11, 'Half of a Yellow Sun', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700052509/ivee_images/mv7kf3kp1tqccqh1ytvr.jpg', 'A masterly, haunting new novel from a writer heralded by The Washington Post Book World as “the 21st-century daughter of Chinua Achebe,” Half of a Yellow Sun re-creates a seminal moment in modern African history: Biafra’s impassioned struggle to establish an independent republic in Nigeria in the 1960s, and the chilling violence that followed.\n\nWith astonishing empathy and the effortless grace of a natural storyteller, Chimamanda Ngozi Adichie weaves together the lives of three characters swept up in the turbulence of the decade. Thirteen-year-old Ugwu is employed as a houseboy for a university professor full of revolutionary zeal. Olanna is the professor’s beautiful mistress, who has abandoned her life of privilege in Lagos for a dusty university town and the charisma of her new lover. And Richard is a shy young Englishman in thrall to Olanna’s twin sister, an enigmatic figure who refuses to belong to anyone. As Nigerian troops advance and the three must run for their lives, their ideals are severely tested, as are their loyalties to one another.\n\nEpic, ambitious, and triumphantly realized, Half of a Yellow Sun is a remarkable novel about moral responsibility, about the end of colonialism, about ethnic allegiances, about class and race—and the ways in which love can complicate them all. Adichie brilliantly evokes the promise and the devastating disappointments that marked this time and place, bringing us one of the most powerful, dramatic, and intensely emotional pictures of modern Africa that we have ever had.', 433, '2023-11-15 12:48:29'),
(12, 'Homegoing', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700052571/ivee_images/nfnuvzy5n04veadrc9ng.jpg', 'Ghana, eighteenth century: two half sisters are born into different villages, each unaware of the other. One will marry an Englishman and lead a life of comfort in the palatial rooms of the Cape Coast Castle. The other will be captured in a raid on her village, imprisoned in the very same castle, and sold into slavery.\n\nOne of Oprah\'s Best Books of the Year and a PEN/Hemingway award winner, Homegoing follows the parallel paths of these sisters and their descendants through eight generations: from the Gold Coast to the plantations of Mississippi, from the American Civil War to Jazz Age Harlem. Yaa Gyasi\'s extraordinary novel illuminates slavery\'s troubled legacy both for those who were taken and those who stayed—and shows how the memory of captivity has been inscribed on the soul of our nation.', 300, '2023-11-15 12:49:31'),
(13, 'On Rotation', 'https://res.cloudinary.com/dovxxvgpq/image/upload/v1700052654/ivee_images/ybpanwmjbxl4qzc9blfr.jpg', 'For fans of Grey’s Anatomy and Seven Days in June, this dazzling debut novel by Shirlene Obuobi explores that time in your life when you must decide what you want, how to get it, & who you are, all while navigating love, friendship, and the realization that the path you’re traveling is going to be a bumpy ride.\n\nGhanaian-American Angela Appiah has checked off all the boxes for the “Perfect Immigrant Daughter.”\nEnroll in an elite medical school\nSnag a suitable lawyer/doctor/engineer boyfriend\nSurround self with a gaggle of successful and/or loyal friends\n\nBut then it quickly all falls apart: her boyfriend dumps her, she bombs the most important exam of her medical career, and her best friend pulls away. And her parents, whose approval seems to hinge on how closely she follows the path they chose, are a lot less proud of their daughter. It’s a quarter life crisis of epic proportions.\n\nAngie, who has always faced her problems by working “twice as hard to get half as far,” is at a loss. Suddenly, she begins to question everything: her career choice, her friendships, even why she\'s attracted to men who don\'t love her as much as she loves them.\n\nAnd just when things couldn’t get more complicated, enter Ricky Gutierrez—brilliant, thoughtful, sexy, and most importantly, seems to see Angie for who she is instead of what she can represent.\n\nUnfortunately, he’s also got “wasteman” practically tattooed across his forehead, and Angie’s done chasing mirages of men. Or so she thinks. For someone who’s always been in control, Angie realizes that there’s one thing she can’t plan on: matters of her heart.', 352, '2023-11-15 12:50:54');

-- --------------------------------------------------------

--
-- Table structure for table `book_ratings`
--

CREATE TABLE `book_ratings` (
  `id` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `userAccountId` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `buylinks`
--

CREATE TABLE `buylinks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `bookId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buylinks`
--

INSERT INTO `buylinks` (`id`, `title`, `bookId`, `url`, `createdAt`) VALUES
(1, 'Kingdom Books (Ghana)', 1, 'https://kingdomstoreonline.com/products/things-fall-apart', '2023-11-13 17:42:33'),
(2, 'Booktique Ghana', 11, 'https://web.facebook.com/BooktiqueGh/posts/1131776534024922/?paipv=0&eav=AfYQTvrr5tCdm2erAPIZ0ZT7O4oLrCkK9HFIgsoFUhlMx4RMqgIAQtRAlATp6y9Otfg&_rdc=1&_rdr', '2023-11-15 13:17:46'),
(3, 'Rovenheights Books (Nigeria)', 11, 'https://rhbooks.com.ng/product/half-of-a-yellow-sun/', '2023-11-15 13:18:40'),
(4, 'Exclusive Books (South Africa)', 11, 'https://www.exclusivebooks.co.za/product/9780007200283', '2023-11-15 13:19:31');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `userAccountId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `userAccountId`, `bookId`, `comment`, `createdAt`) VALUES
(1, 1, 1, 'I love this book soooo much!', '2023-11-15 13:02:55'),
(2, 7, 11, 'I just finished reading and I love this books so much', '2023-12-10 22:15:29');

-- --------------------------------------------------------

--
-- Table structure for table `feeds`
--

CREATE TABLE `feeds` (
  `id` int(11) NOT NULL,
  `userAccountId` int(11) NOT NULL,
  `action` enum('liked','followed','commented','set_to_reading','recommended','set_to_done_reading') NOT NULL,
  `bookId` int(11) DEFAULT NULL,
  `commentId` int(11) DEFAULT NULL,
  `targetUserId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `feeds`
--

INSERT INTO `feeds` (`id`, `userAccountId`, `action`, `bookId`, `commentId`, `targetUserId`, `createdAt`) VALUES
(1, 1, 'set_to_reading', 1, NULL, NULL, '2023-11-15 12:51:54'),
(2, 1, 'set_to_done_reading', 2, NULL, NULL, '2023-11-15 12:52:10'),
(3, 1, 'set_to_reading', 3, NULL, NULL, '2023-11-15 12:52:26'),
(4, 2, 'followed', NULL, NULL, 1, '2023-11-15 12:54:55'),
(5, 1, 'set_to_reading', 4, NULL, NULL, '2023-11-15 12:56:31'),
(6, 1, 'set_to_reading', 5, NULL, NULL, '2023-11-15 12:56:41'),
(7, 1, 'set_to_reading', 6, NULL, NULL, '2023-11-15 12:56:59'),
(8, 1, 'set_to_done_reading', 7, NULL, NULL, '2023-11-15 12:57:09'),
(9, 1, 'set_to_reading', 8, NULL, NULL, '2023-11-15 12:57:18'),
(10, 1, 'set_to_done_reading', 9, NULL, NULL, '2023-11-15 12:57:25'),
(11, 1, 'set_to_reading', 10, NULL, NULL, '2023-11-15 12:57:33'),
(12, 1, 'set_to_reading', 11, NULL, NULL, '2023-11-15 12:57:41'),
(13, 1, 'set_to_reading', 12, NULL, NULL, '2023-11-15 12:57:52'),
(14, 1, 'set_to_done_reading', 13, NULL, NULL, '2023-11-15 12:58:03'),
(15, 1, 'followed', NULL, NULL, 2, '2023-11-15 12:58:32'),
(16, 2, 'set_to_reading', 1, NULL, NULL, '2023-11-15 12:58:47'),
(17, 2, 'set_to_reading', 2, NULL, NULL, '2023-11-15 12:59:01'),
(18, 2, 'set_to_done_reading', 3, NULL, NULL, '2023-11-15 13:00:58'),
(19, 1, 'commented', 1, NULL, NULL, '2023-11-15 13:02:55'),
(20, 1, 'recommended', 1, NULL, 2, '2023-11-15 13:04:06'),
(21, 2, 'commented', NULL, 1, NULL, '2023-11-15 13:06:45'),
(22, 2, 'recommended', 2, NULL, 1, '2023-11-15 13:11:02'),
(23, 1, 'set_to_done_reading', 1, NULL, NULL, '2023-11-28 10:38:02'),
(24, 1, 'set_to_reading', 1, NULL, NULL, '2023-11-28 10:39:51'),
(25, 1, 'set_to_reading', 2, NULL, NULL, '2023-12-01 09:04:03'),
(26, 7, 'set_to_reading', 1, NULL, NULL, '2023-12-10 20:46:19'),
(27, 7, 'set_to_reading', 11, NULL, NULL, '2023-12-10 20:46:27'),
(28, 7, 'set_to_reading', 2, NULL, NULL, '2023-12-10 20:46:35'),
(29, 7, 'set_to_reading', 3, NULL, NULL, '2023-12-10 20:46:44'),
(30, 7, 'set_to_done_reading', 4, NULL, NULL, '2023-12-10 20:46:52'),
(31, 7, 'set_to_done_reading', 5, NULL, NULL, '2023-12-10 20:47:00'),
(32, 7, 'commented', 11, NULL, NULL, '2023-12-10 22:15:29'),
(33, 8, 'set_to_reading', 2, NULL, NULL, '2023-12-10 22:19:23'),
(34, 8, 'set_to_reading', 3, NULL, NULL, '2023-12-10 22:19:31'),
(35, 8, 'set_to_done_reading', 4, NULL, NULL, '2023-12-10 22:19:39'),
(36, 8, 'set_to_done_reading', 5, NULL, NULL, '2023-12-10 22:20:10'),
(37, 8, 'followed', NULL, NULL, 7, '2023-12-10 22:21:29'),
(38, 7, 'followed', NULL, NULL, 8, '2023-12-10 22:24:29'),
(39, 8, 'recommended', 11, NULL, 7, '2023-12-10 22:24:38'),
(40, 8, 'commented', NULL, 2, NULL, '2023-12-10 22:25:34');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `userAccountId` int(11) NOT NULL,
  `followingId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`id`, `userAccountId`, `followingId`, `createdAt`) VALUES
(1, 2, 1, '2023-11-15 12:54:54'),
(2, 1, 2, '2023-11-15 12:58:32'),
(3, 8, 7, '2023-12-10 22:21:29'),
(4, 7, 8, '2023-12-10 22:24:29');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `title`, `createdAt`) VALUES
(1, 'Historical', '2023-11-13 16:38:33'),
(2, 'Fiction', '2023-11-13 16:38:40'),
(3, 'Classics', '2023-11-13 17:40:40'),
(4, 'Challenging', '2023-11-13 17:40:49'),
(5, 'Dark', '2023-11-13 17:40:54'),
(6, 'Reflective', '2023-11-13 17:40:59'),
(7, 'Medium-paced', '2023-11-13 17:41:07'),
(8, 'Fast-paced', '2023-11-15 12:12:27'),
(9, 'Slow-paced', '2023-11-15 12:12:35'),
(10, 'Fantasy', '2023-11-15 12:12:45'),
(11, 'Adventurous', '2023-11-15 12:12:56'),
(12, 'Emotional', '2023-11-15 12:13:03'),
(13, 'Mysterious', '2023-11-15 12:13:10'),
(14, 'Young adult', '2023-11-15 12:13:17'),
(15, 'Contemporary', '2023-11-15 12:36:24'),
(16, 'Literary', '2023-11-15 12:36:31'),
(17, 'Sad', '2023-11-15 12:36:37'),
(18, 'lgbtqai+', '2023-11-15 12:37:29'),
(19, 'hopeful', '2023-11-15 12:37:38'),
(20, 'Short stories', '2023-11-15 12:38:04'),
(21, 'Romance', '2023-11-19 10:39:59'),
(22, 'Custom', '2023-11-19 10:40:45');

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `id` int(11) NOT NULL,
  `userAccountId` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `reply` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `replies`
--

INSERT INTO `replies` (`id`, `userAccountId`, `commentId`, `reply`, `createdAt`) VALUES
(1, 2, 1, 'IKR! Could not put it down once I started.', '2023-11-15 13:06:45'),
(2, 8, 2, 'Me too', '2023-12-10 22:25:34');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `expires` datetime NOT NULL,
  `session_token` varchar(255) NOT NULL,
  `user_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userlikes`
--

CREATE TABLE `userlikes` (
  `id` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `userAccountId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_verified` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE `user_accounts` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `ban` tinyint(4) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_accounts`
--

INSERT INTO `user_accounts` (`id`, `fullname`, `email`, `password`, `role`, `ban`, `createdAt`) VALUES
(7, 'Helena Owusu', 'helenaowusu@gmail.com', '$2a$10$wHXgtOCVHKl5oHsW/t20eOqK6zdEEIuuwegbnEyzFH0FG8uN8E6me', 'isUser', 0, '2023-12-10 20:42:51'),
(8, 'Tracy Frempong', 'tracy.frempong06@gmail.com', '$2a$10$Pek687EBHjQp.WJOnpQF5uDSYgwthBksG8pCK.Q8kSpMLczamSFrC', 'isUser', 0, '2023-12-10 22:18:02');

-- --------------------------------------------------------

--
-- Table structure for table `user_readings`
--

CREATE TABLE `user_readings` (
  `id` int(11) NOT NULL,
  `userAccountId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `done_reading` tinyint(4) NOT NULL,
  `wish_to_read` tinyint(4) NOT NULL,
  `pageReached` double NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_readings`
--

INSERT INTO `user_readings` (`id`, `userAccountId`, `bookId`, `done_reading`, `wish_to_read`, `pageReached`, `createdAt`) VALUES
(1, 1, 1, 0, 0, 0, '2023-11-15 12:51:54'),
(2, 1, 2, 0, 0, 0, '2023-11-15 12:52:10'),
(3, 1, 3, 0, 0, 0, '2023-11-15 12:52:26'),
(4, 1, 4, 0, 0, 0, '2023-11-15 12:56:31'),
(5, 1, 5, 0, 0, 0, '2023-11-15 12:56:41'),
(6, 1, 6, 0, 0, 0, '2023-11-15 12:56:59'),
(7, 1, 7, 0, 0, 0, '2023-11-15 12:57:09'),
(8, 1, 8, 0, 0, 0, '2023-11-15 12:57:18'),
(9, 1, 9, 0, 0, 0, '2023-11-15 12:57:25'),
(10, 1, 10, 0, 0, 0, '2023-11-15 12:57:33'),
(11, 1, 11, 0, 0, 0, '2023-11-15 12:57:41'),
(12, 1, 12, 0, 0, 0, '2023-11-15 12:57:52'),
(13, 1, 13, 0, 0, 0, '2023-11-15 12:58:03'),
(14, 2, 1, 0, 0, 0, '2023-11-15 12:58:47'),
(15, 2, 2, 0, 0, 0, '2023-11-15 12:59:01'),
(16, 2, 3, 0, 0, 0, '2023-11-15 13:00:58'),
(17, 7, 1, 0, 0, 30, '2023-12-10 20:46:19'),
(18, 7, 11, 0, 1, 0, '2023-12-10 20:46:27'),
(19, 7, 2, 0, 1, 0, '2023-12-10 20:46:35'),
(20, 7, 3, 0, 1, 0, '2023-12-10 20:46:44'),
(21, 7, 4, 1, 0, 0, '2023-12-10 20:46:52'),
(22, 7, 5, 1, 0, 0, '2023-12-10 20:47:00'),
(23, 8, 2, 0, 0, 56, '2023-12-10 22:19:23'),
(24, 8, 3, 0, 1, 0, '2023-12-10 22:19:31'),
(25, 8, 4, 1, 0, 0, '2023-12-10 22:19:39'),
(26, 8, 5, 1, 0, 0, '2023-12-10 22:20:10');

-- --------------------------------------------------------

--
-- Table structure for table `user_recommends`
--

CREATE TABLE `user_recommends` (
  `id` int(11) NOT NULL,
  `userAccountId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `targerUserId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_recommends`
--

INSERT INTO `user_recommends` (`id`, `userAccountId`, `bookId`, `targerUserId`, `createdAt`) VALUES
(1, 1, 1, 2, '2023-11-15 13:04:06'),
(2, 2, 2, 1, '2023-11-15 13:11:02'),
(3, 8, 11, 7, '2023-12-10 22:24:38');

-- --------------------------------------------------------

--
-- Table structure for table `verification_tokens`
--

CREATE TABLE `verification_tokens` (
  `token` varchar(255) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `expires` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `authorbooks`
--
ALTER TABLE `authorbooks`
  ADD PRIMARY KEY (`bookId`,`authorId`),
  ADD UNIQUE KEY `authorbooks_authorId_bookId_unique` (`bookId`,`authorId`),
  ADD KEY `authorId` (`authorId`);

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookgenres`
--
ALTER TABLE `bookgenres`
  ADD PRIMARY KEY (`bookId`,`genreId`),
  ADD UNIQUE KEY `bookgenres_genreId_bookId_unique` (`bookId`,`genreId`),
  ADD KEY `genreId` (`genreId`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book_ratings`
--
ALTER TABLE `book_ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookId` (`bookId`),
  ADD KEY `userAccountId` (`userAccountId`);

--
-- Indexes for table `buylinks`
--
ALTER TABLE `buylinks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookId` (`bookId`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userAccountId` (`userAccountId`),
  ADD KEY `bookId` (`bookId`);

--
-- Indexes for table `feeds`
--
ALTER TABLE `feeds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userAccountId` (`userAccountId`),
  ADD KEY `bookId` (`bookId`),
  ADD KEY `commentId` (`commentId`),
  ADD KEY `targetUserId` (`targetUserId`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userAccountId` (`userAccountId`),
  ADD KEY `followingId` (`followingId`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userAccountId` (`userAccountId`),
  ADD KEY `commentId` (`commentId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sessionToken` (`session_token`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `userlikes`
--
ALTER TABLE `userlikes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commentId` (`commentId`),
  ADD KEY `userAccountId` (`userAccountId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_readings`
--
ALTER TABLE `user_readings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userAccountId` (`userAccountId`),
  ADD KEY `bookId` (`bookId`);

--
-- Indexes for table `user_recommends`
--
ALTER TABLE `user_recommends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userAccountId` (`userAccountId`),
  ADD KEY `bookId` (`bookId`),
  ADD KEY `targerUserId` (`targerUserId`);

--
-- Indexes for table `verification_tokens`
--
ALTER TABLE `verification_tokens`
  ADD PRIMARY KEY (`token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `book_ratings`
--
ALTER TABLE `book_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `buylinks`
--
ALTER TABLE `buylinks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `feeds`
--
ALTER TABLE `feeds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userlikes`
--
ALTER TABLE `userlikes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_accounts`
--
ALTER TABLE `user_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_readings`
--
ALTER TABLE `user_readings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `user_recommends`
--
ALTER TABLE `user_recommends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `authorbooks`
--
ALTER TABLE `authorbooks`
  ADD CONSTRAINT `authorbooks_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `authorbooks_ibfk_2` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bookgenres`
--
ALTER TABLE `bookgenres`
  ADD CONSTRAINT `bookgenres_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookgenres_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_ratings`
--
ALTER TABLE `book_ratings`
  ADD CONSTRAINT `book_ratings_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_ratings_ibfk_2` FOREIGN KEY (`userAccountId`) REFERENCES `user_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `buylinks`
--
ALTER TABLE `buylinks`
  ADD CONSTRAINT `buylinks_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userAccountId`) REFERENCES `user_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feeds`
--
ALTER TABLE `feeds`
  ADD CONSTRAINT `feeds_ibfk_1` FOREIGN KEY (`userAccountId`) REFERENCES `user_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `feeds_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `feeds_ibfk_3` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `feeds_ibfk_4` FOREIGN KEY (`targetUserId`) REFERENCES `user_accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userAccountId`) REFERENCES `user_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`followingId`) REFERENCES `user_accounts` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `replies`
--
ALTER TABLE `replies`
  ADD CONSTRAINT `replies_ibfk_1` FOREIGN KEY (`userAccountId`) REFERENCES `user_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `replies_ibfk_2` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userlikes`
--
ALTER TABLE `userlikes`
  ADD CONSTRAINT `userlikes_ibfk_1` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userlikes_ibfk_2` FOREIGN KEY (`userAccountId`) REFERENCES `user_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_readings`
--
ALTER TABLE `user_readings`
  ADD CONSTRAINT `user_readings_ibfk_1` FOREIGN KEY (`userAccountId`) REFERENCES `user_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_readings_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_recommends`
--
ALTER TABLE `user_recommends`
  ADD CONSTRAINT `user_recommends_ibfk_1` FOREIGN KEY (`userAccountId`) REFERENCES `user_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_recommends_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_recommends_ibfk_3` FOREIGN KEY (`targerUserId`) REFERENCES `user_accounts` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
