import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Users, Star, Menu, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Type definition for Africa Cup team players
type AfricaCupPlayer = {
  name: string;
  position: string;
  info: string;
  age?: number;
  height?: string;
  weight?: string;
  club?: string;
};

// Team data structure
const teams: Array<{
  id: string;
  name: string;
  flag: string;
  country: string;
  roster: AfricaCupPlayer[];
}> = [
  {
    id: 'zimbabwe',
    name: 'Zimbabwe Sables',
    flag: '🇿🇼',
    country: 'Zimbabwe',
    roster: [
      // Hookers
      { name: 'Bryan Chiang', position: 'Hooker', age: 21, height: '1.75m', weight: '105kg', club: 'Manchester Met/Broughton Park RFC/Old Hararians', info: 'Experienced hooker with solid lineout throwing' },
      { name: 'Simba Mandioma', position: 'Hooker', age: 32, height: '1.70m', weight: '101kg', club: 'Old Hararians/Harare Province', info: 'Mobile hooker with strong scrummaging' },
      { name: 'Liam Larkan', position: 'Hooker', age: 27, height: '1.82m', weight: '103kg', club: 'Pirates RFC- South Africa', info: 'Experienced hooker with leadership qualities' },
      
      // Props
      { name: 'Victor Mupunga', position: 'Prop', age: 25, height: '1.81m', weight: '127kg', club: 'Union Sportive Bressane- France', info: 'Powerful loosehead prop' },
      { name: 'Tyran Fagan', position: 'Prop', age: 33, height: '1.83m', weight: '105kg', club: 'Bizkaia Gernika RT- Spain', info: 'Solid front row forward' },
      { name: 'Zvikomborero Chimoto', position: 'Prop', age: 26, height: '1.71m', weight: '114kg', club: 'Old Hararians/Harare Province', info: 'Strong scrummaging prop' },
      { name: 'Cleopas Kundiona', position: 'Prop', age: 26, height: '1.81m', weight: '118kg', club: 'Northampton Saints- UK', info: 'Experienced front row anchor' },
      { name: 'Brian Makamure', position: 'Prop', age: 34, height: '1.72m', weight: '106kg', club: 'Old Hararians', info: 'Versatile front row player' },
      { name: 'Bornwell Gwinji', position: 'Prop', age: 27, height: '1.77m', weight: '118kg', club: 'Gernika Rugby Club- Spain', info: 'Dynamic young prop' },
      
      // Second Row
      { name: 'Kudakwashe Nyakufaringwa', position: '2nd Row', age: 31, height: '2.00m', weight: '127kg', club: 'Budowlan Lublin RFC-Poland', info: 'Lineout specialist and leader' },
      { name: 'Simba Siraha', position: '2nd Row', age: 22, height: '1.95m', weight: '100kg', club: 'Budmex rugby Bialystok-Poland', info: 'Athletic lock forward' },
      { name: 'Tadiwa Gwashu', position: '2nd Row', age: 23, height: '1.90m', weight: '106kg', club: 'Harare Sports Club', info: 'Powerful lineout option' },
      { name: 'Brian Nyaude', position: '2nd Row', age: 30, height: '1.96m', weight: '92kg', club: 'Old Hararians', info: 'Mobile second row forward' },
      
      // Back Row
      { name: 'Jason Fraser', position: 'Back Row', age: 34, height: '1.96m', weight: '108kg', club: 'Nevers-France', info: 'Captain and experienced campaigner' },
      { name: 'Aiden Burnett', position: 'Back Row', age: 27, height: '1.89m', weight: '114kg', club: 'Old Hararians/Harare Province', info: 'Dynamic loose forward' },
      { name: 'Dylan Utete', position: 'Back Row', age: 25, height: '1.87m', weight: '111kg', club: 'Okman Rugby- South Korea', info: 'Mobile back row player' },
      { name: 'Godfrey Muzanargwo', position: 'Back Row', age: 26, height: '1.93m', weight: '110kg', club: 'Valke -South Africa', info: 'Powerful ball carrier' },
      { name: 'Tinotenda Mavesere', position: 'Back Row', age: 26, height: '1.89m', weight: '105kg', club: 'The Sharks- South Africa', info: 'Athletic loose forward' },
      
      // Half Backs
      { name: 'Hilton Mudariki', position: 'Half Back', age: 32, height: '1.72m', weight: '80kg', club: 'Old Hararians', info: 'Quick service from the base' },
      { name: 'Keegan Joubert', position: 'Half Back', age: 24, height: '1.74m', weight: '85kg', club: 'Durbell Rugby Club/Western Province', info: 'Promising young scrum-half' },
      { name: 'Tyrone Gombe', position: 'Half Back', age: 19, height: '1.64m', weight: '75kg', club: 'Western Province Academy', info: 'Versatile half back option' },
      
      // Fly Halves
      { name: 'Ian Prior', position: 'Fly Half', age: 34, height: '1.79m', weight: '83kg', club: 'Associates Rugby Club-Australia', info: 'Veteran playmaker' },
      { name: 'Lenience Tambwera', position: 'Fly Half', age: 32, height: '1.88m', weight: '98kg', club: 'Harare Sports Club', info: 'Quick-thinking fly half' },
      
      // Centres
      { name: 'Brandon Mudzekenyedzi', position: 'Centre', age: 28, height: '1.84m', weight: '104kg', club: 'Okman Rugby- South Korea', info: 'Powerful center with pace' },
      { name: 'Dion Khumalo', position: 'Centre', age: 22, height: '1.73m', weight: '92kg', club: 'Old Hararians', info: 'Creative center with good hands' },
      { name: 'Kudzai Mashawi', position: 'Centre', age: 31, height: '1.78m', weight: '109kg', club: 'Harare Sports Club', info: 'Strong defensive center' },
      
      // Outside Backs
      { name: 'Trevor Gurwe', position: 'Outside Back', age: 21, height: '1.85m', weight: '93kg', club: 'Old Georgians', info: 'Pacy winger with finishing ability' },
      { name: 'Matthew McNab', position: 'Outside Back', age: 27, height: '1.88m', weight: '95kg', club: 'Doncaster Knights-UK', info: 'Versatile back three player' },
      { name: 'Tapiwa Mafura', position: 'Outside Back', age: 28, height: '1.74m', weight: '80kg', club: 'Lions-South Africa', info: 'Electric winger with pace' },
      { name: 'Takudzwa Musingwini', position: 'Outside Back', age: 22, height: '1.78m', weight: '89kg', club: 'Iowa Central Community College- USA', info: 'Solid fullback option' },
      { name: 'Edward Sigauke', position: 'Outside Back', age: 21, height: '1.69m', weight: '85kg', club: 'Varsity College- South Africa', info: 'Experienced outside back' }
    ]
  },
  {
    id: 'algeria',
    name: 'Algeria',
    flag: '🇩🇿',
    country: 'Algeria',
    roster: [
      { name: 'Yacine Bensaha', position: 'Hooker', info: 'National team captain and leader' },
      { name: 'Karim Boudjemaa', position: 'Prop', info: 'Experienced front row anchor' },
      { name: 'Ahmed Tafat', position: '2nd Row', info: 'Lineout specialist' },
      { name: 'Sofiane Guitouni', position: 'Back Row', info: 'Mobile loose forward' },
      { name: 'Yasser Boudaoud', position: 'Half Back', info: 'Quick-thinking scrum-half' },
      { name: 'Nassim Lalaoui', position: 'Fly Half', info: 'Creative playmaker' },
      { name: 'Bilal Bouguetof', position: 'Centre', info: 'Strong defensive center' },
      { name: 'Rami Bouchar', position: 'Winger', info: 'Pacy finisher on the wing' }
    ]
  },
  {
    id: 'namibia',
    name: 'Namibia',
    flag: '🇳🇦',
    country: 'Namibia',
    roster: [
      // Forwards
      { name: 'Haitembu Shikufa', position: 'Prop', info: 'Powerful front row forward' },
      { name: 'Jason Benade', position: 'Hooker', info: 'Experienced hooker with solid lineout throwing' },
      { name: 'Otja Auala', position: 'Prop', info: 'Strong scrummaging prop' },
      { name: 'Sidney Halupe', position: '2nd Row', info: 'Athletic lock forward' },
      { name: 'Louis van der Westhuizen', position: '2nd Row', info: 'Lineout specialist' },
      { name: 'Armand Combrinck', position: 'Back Row', info: 'Dynamic loose forward' },
      { name: 'Torsten van Jaarsveld', position: 'Hooker', info: 'Experienced hooker with leadership qualities' },
      { name: 'Aranos Coetzee', position: 'Back Row', info: 'Powerful ball carrier' },
      { name: 'Adriaan Ludick', position: 'Prop', info: 'Solid front row anchor' },
      { name: 'Oliver Kurz', position: 'Back Row', info: 'Mobile loose forward' },
      { name: 'Tiaan de Klerk', position: '2nd Row', info: 'Powerful lineout option' },
      { name: 'Wian Conradie', position: 'Back Row', info: 'Athletic back row player' },
      { name: 'Johan Retief', position: 'Prop', info: 'Veteran front row with experience' },
      { name: 'Max Katjijeko', position: '2nd Row', info: 'Athletic lineout option' },
      { name: 'Richard Hardwick', position: 'Back Row', info: 'Experienced loose forward' },
      { name: 'Adriaan Booysen', position: 'Back Row', info: 'Mobile back row player' },
      { name: 'Prince !Gaoseb', position: 'Hooker', info: 'Dynamic hooker with good hands' },
      
      // Backs
      { name: 'Jacques Theron', position: 'Half Back', info: 'Quick-thinking scrum-half' },
      { name: 'AJ Kearns', position: 'Half Back', info: 'Creative playmaker' },
      { name: 'Tiaan Swanepoel', position: 'Outside Back', info: 'Versatile fullback option' },
      { name: 'Andre van der Berg', position: 'Centre', info: 'Powerful center with good hands' },
      { name: 'Le Roux Malan', position: 'Outside Back', info: 'Pacy winger with finishing ability' },
      { name: 'Danco Burger', position: 'Centre', info: 'Strong ball-carrying center' },
      { name: 'Alcino Izaacs', position: 'Outside Back', info: 'Electric winger with pace' },
      { name: 'Jurgen Meyer', position: 'Centre', info: 'Experienced center with leadership' },
      { name: 'Cliven Loubser', position: 'Half Back', info: 'Goal-kicking fly-half' },
      { name: 'Danie van der Merwe', position: 'Outside Back', info: 'Solid outside back option' },
      { name: 'Jay Cee Nel', position: 'Outside Back', info: 'Experienced back three player' }
    ]
  },
  {
    id: 'kenya',
    name: 'Kenya Simbas',
    flag: '🇰🇪',
    country: 'Kenya',
    roster: [
      // Forwards
      // Props
      { name: 'Ephraim Oduor', position: 'Prop', info: 'Experienced front row leader' },
      { name: 'Edward Mwaura', position: 'Prop', info: 'Powerful tighthead prop' },
      { name: 'Vincent Mwikhali', position: 'Prop', info: 'Solid front row anchor' },
      { name: 'Wilhite Mususi', position: 'Prop', info: 'Strong scrummaging prop' },
      
      // Hookers
      { name: 'Teddy Akala', position: 'Hooker', info: 'Solid lineout thrower' },
      { name: 'Eugine Sifuna', position: 'Hooker', info: 'Mobile hooker with good hands' },
      
      // Locks
      { name: 'Hibrahim Ayoo', position: '2nd Row', info: 'Athletic lock forward' },
      { name: 'Thomas Okeyo', position: '2nd Row', info: 'Lineout specialist' },
      { name: 'Andycole Omollo', position: '2nd Row', info: 'Powerful lineout option' },
      { name: 'Emmanuel Slungi', position: '2nd Row', info: 'Experienced second row' },
      
      // Back Row
      { name: 'George Nyambua', position: 'Back Row', info: 'Captain and inspirational leader' },
      { name: 'Patrick Sabatia', position: 'Back Row', info: 'Dynamic loose forward' },
      { name: 'David Bunduki', position: 'Back Row', info: 'Powerful ball carrier' },
      { name: 'Obat Kuke', position: 'Back Row', info: 'Mobile back row player' },
      { name: 'Bethuel Anami', position: 'Back Row', info: 'Athletic loose forward' },
      { name: 'Elkeans Musonye', position: 'Back Row', info: 'Promising young forward' },
      
      // Backs
      // Scrum Halves
      { name: 'Samuel Asati', position: 'Half Back', info: 'Quick-thinking scrum-half' },
      { name: 'Brian Tanga', position: 'Half Back', info: 'Experienced scrum-half' },
      
      // Fly Halves
      { name: 'Barry Young', position: 'Half Back', info: 'Creative playmaker and goal-kicker' },
      { name: 'Brian Wahinya', position: 'Half Back', info: 'Promising young fly-half' },
      
      // Centres
      { name: 'Walter Okoth', position: 'Centre', info: 'Experienced center and leader' },
      { name: 'Samuel Ovwamu', position: 'Centre', info: 'Powerful ball-carrying center' },
      { name: 'Bryceson Adaka', position: 'Centre', info: 'Creative center with good hands' },
      { name: 'John Okoth', position: 'Centre', info: 'Strong defensive center' },
      
      // Wingers
      { name: 'Griffin Chao', position: 'Outside Back', info: 'Pacy finisher with electric pace' },
      { name: 'Timothy Omela', position: 'Outside Back', info: 'Powerful wing with finishing ability' },
      
      // Full Backs
      { name: 'Jone Kubu', position: 'Outside Back', info: 'Safe fullback under pressure' },
      { name: 'Derick Ashiundu', position: 'Outside Back', info: 'Versatile back three player' }
    ]
  },
  {
    id: 'uganda',
    name: 'Uganda',
    flag: '🇺🇬',
    country: 'Uganda',
    roster: [
      // Forwards
      { name: 'Bwambale Nathan Asiimire', position: 'Prop', info: 'Powerful front row forward' },
      { name: 'Edward Emiemu', position: 'Hooker', info: 'Solid lineout thrower' },
      { name: 'Ssenteza Wycliff Santos', position: 'Prop', info: 'Strong scrummaging prop' },
      { name: 'Ayebazibwe Blair', position: '2nd Row', info: 'Athletic lock forward' },
      { name: 'Kivumbi Saul', position: 'Back Row', info: 'Experienced loose forward' },
      { name: 'Kimbowa Collin', position: '2nd Row', info: 'Lineout specialist' },
      { name: 'Maido Fahad', position: 'Prop', info: 'Dynamic young prop' },
      { name: 'Emong Eliphaz', position: 'Hooker', info: 'Mobile hooker with good hands' },
      { name: 'Opio Julius', position: 'Back Row', info: 'Powerful ball carrier' },
      { name: 'Gongodyo Sydney', position: '2nd Row', info: 'Experienced second row' },
      { name: 'Wandera Brian', position: 'Back Row', info: 'Mobile loose forward' },
      { name: 'Byron Oketayot', position: 'Back Row', info: 'Captain and inspirational leader' },
      { name: 'Frank Kidega', position: 'Back Row', info: 'Vice Captain with vast experience' },
      { name: 'Ogena Pius', position: 'Prop', info: 'Solid front row anchor' },
      { name: 'Desire Ayera', position: 'Prop', info: 'Veteran front row with leadership qualities' },
      { name: 'Aturinda Alex', position: '2nd Row', info: 'Athletic lineout option' },
      
      // Backs
      { name: 'Conrad Wanyama Wandera', position: 'Half Back', info: 'Vice Captain and experienced scrum-half' },
      { name: 'Massanganzira Isaac', position: 'Half Back', info: 'Creative playmaker' },
      { name: 'Aaron Ofoywroth', position: 'Centre', info: 'Powerful center with good hands' },
      { name: 'Philip Wokorach', position: 'Half Back', info: 'Veteran scrum-half with pace' },
      { name: 'Kasito Adrian', position: 'Outside Back', info: 'Pacy winger with finishing ability' },
      { name: 'Ivan Otema', position: 'Half Back', info: 'Creative playmaker and goal-kicker' },
      { name: 'Jadwong Joseph Aredo', position: 'Centre', info: 'Promising young center' },
      { name: 'Ssembusi Shakim', position: 'Outside Back', info: 'Versatile back three player' },
      { name: 'Liam Walker Christopher', position: 'Outside Back', info: 'Solid fullback option' },
      { name: 'Timothy Kisiga', position: 'Centre', info: 'Strong ball-carrying center' },
      { name: 'Ampeirwe William Nkore', position: 'Outside Back', info: 'Experienced outside back' },
      { name: 'Munyani Ian Arnold', position: 'Outside Back', info: 'Electric winger with pace' }
    ]
  },
  {
    id: 'senegal',
    name: 'Senegal',
    flag: '🇸🇳',
    country: 'Senegal',
    roster: [
      { name: 'Alioune Ndiaye', position: 'Back Row', info: 'Captain and inspirational leader' },
      { name: 'Mamadou Diop', position: 'Hooker', info: 'Solid lineout thrower' },
      { name: 'Ibrahima Fall', position: 'Prop', info: 'Experienced front row anchor' },
      { name: 'Cheikh Diallo', position: '2nd Row', info: 'Lineout specialist and leader' },
      { name: 'Abdou Seck', position: 'Half Back', info: 'Quick service provider' },
      { name: 'Modou Faye', position: 'Fly Half', info: 'Creative playmaker' },
      { name: 'Serigne Dia', position: 'Centre', info: 'Powerful ball-carrying center' },
      { name: 'Landing Badji', position: 'Winger', info: 'Speedster with finishing ability' }
    ]
  },
  {
    id: 'cotedivoire',
    name: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    country: 'Côte d\'Ivoire',
    roster: [
      { name: 'Adama Coulibaly', position: 'Back Row', info: 'Captain and experienced leader' },
      { name: 'Koffi Kouame', position: 'Hooker', info: 'Experienced hooker with solid lineout skills' },
      { name: 'Didier Yao', position: 'Prop', info: 'Veteran prop with international experience' },
      { name: 'Seydou Doumbia', position: '2nd Row', info: 'Athletic lineout option' },
      { name: 'Maxime Dago', position: 'Half Back', info: 'Quick-thinking scrum-half' },
      { name: 'Jean-Baptiste Anoh', position: 'Fly Half', info: 'Creative playmaker and goal-kicker' },
      { name: 'Franck Kone', position: 'Centre', info: 'Powerful center with good hands' },
      { name: 'Serge Bile', position: 'Winger', info: 'Pacy finisher on the wing' }
    ]
  },
  {
    id: 'morocco',
    name: 'Morocco',
    flag: '🇲🇦',
    country: 'Morocco',
    roster: [
      // Forwards (Les Avants)
      { name: 'Aanikid Nassim', position: 'Prop', info: 'Powerful front row forward' },
      { name: 'Achahbar Adil', position: 'Hooker', info: 'Experienced hooker with solid lineout throwing' },
      { name: 'Ait Naceur Nail', position: 'Prop', info: 'Strong scrummaging prop' },
      { name: 'Bachiri Theo', position: '2nd Row', info: 'Athletic lock forward' },
      { name: 'Bouamrane Nabil', position: '2nd Row', info: 'Lineout specialist' },
      { name: 'Boukanoucha Jibril', position: 'Back Row', info: 'Dynamic loose forward' },
      { name: 'Boukanoucha Amine', position: 'Back Row', info: 'Mobile back row player' },
      { name: 'El Kadri Naoufal', position: 'Prop', info: 'Veteran front row with experience' },
      { name: 'El Ansari Elias', position: 'Hooker', info: 'Reliable hooker with good hands' },
      { name: 'El Khaoulani Billal', position: 'Back Row', info: 'Powerful ball carrier' },
      { name: 'El Fakir Zakaria', position: '2nd Row', info: 'Tall lineout jumper' },
      { name: 'El Khattabi Ilan', position: 'Back Row', info: 'Athletic loose forward' },
      { name: 'El Gharbaoui Reda', position: 'Prop', info: 'Strong scrummaging specialist' },
      { name: 'El Yahyaoui Ilian', position: 'Back Row', info: 'Versatile back row option' },
      { name: 'Fadli Bilal', position: '2nd Row', info: 'Powerful lineout option' },
      { name: 'Hou Youness', position: 'Back Row', info: 'Mobile loose forward' },
      { name: 'Haimiche Hassan', position: 'Hooker', info: 'Dynamic hooker with leadership' },
      
      // Backs (Les Trois-Quarts)
      { name: 'Jaoudat Soheyl', position: 'Half Back', info: 'Quick-thinking scrum-half' },
      { name: 'Jnaoui Samir', position: 'Half Back', info: 'Creative playmaker' },
      { name: 'Peutin Louis', position: 'Outside Back', info: 'Versatile fullback option' },
      { name: 'Khaouti Karim', position: 'Centre', info: 'Powerful center with good hands' },
      { name: 'Tirefort Valentin', position: 'Outside Back', info: 'Pacy winger with finishing ability' },
      { name: 'Maamry Yassine', position: 'Centre', info: 'Strong ball-carrying center' },
      { name: 'Qadiri Karim', position: 'Outside Back', info: 'Electric winger with pace' },
      { name: 'Ouazzani Jad', position: 'Centre', info: 'Experienced center with leadership' },
      { name: 'Laabidate Smail', position: 'Half Back', info: 'Tactical fly-half' },
      { name: 'Terki Nassim', position: 'Outside Back', info: 'Solid outside back option' },
      { name: 'El Youmouri Nassim', position: 'Outside Back', info: 'Experienced back three player' }
    ]
  }
];

// Zimbabwe player image mapping
const zimbabwePlayerImages: Record<string, string> = {
  'Bryan Chiang': '/assets/Zimbabwe Players/Bryan Chiang.png',
  'Simba Mandioma': '/assets/Zimbabwe Players/Simba Mandioma.png',
  'Victor Mupunga': '/assets/Zimbabwe Players/Victor Mupunga.png',
  'Tyran Fagan': '/assets/Zimbabwe Players/Tyran Fagan.png',
  'Zvikomborero Chimoto': '/assets/Zimbabwe Players/Zvikomborero Chimoto.png',
  'Cleopas Kundiona': '/assets/Zimbabwe Players/Cleopas Kundiona.png',
  'Brian Makamure': '/assets/Zimbabwe Players/Briam Makamure.png',
  'Bornwell Gwinji': '/assets/Zimbabwe Players/Bornwell Gwinji.png',
  'Kudakwashe Nyakufaringwa': '/assets/Zimbabwe Players/Kudakwashe Nyakufaringwa.png',
  'Simba Siraha': '/assets/Zimbabwe Players/Simba Siraha.png',
  'Tadiwa Gwashu': '/assets/Zimbabwe Players/Tadiwa Gwashu.png',
  'Brian Nyaude': '/assets/Zimbabwe Players/Brian Nyaude.png',
  'Jason Fraser': '/assets/Zimbabwe Players/Jason Fraser.png',
  'Aiden Burnett': '/assets/Zimbabwe Players/Aiden Burnett.png',
  'Dylan Utete': '/assets/Zimbabwe Players/Dylan Utete.png',
  'Godfrey Muzanargwo': '/assets/Zimbabwe Players/Godfrey Muzanargwo.png',
  'Tinotenda Mavesere': '/assets/Zimbabwe Players/Tinotenda Mavesere.png',
  'Hilton Mudariki': '/assets/Zimbabwe Players/Hilton Mudariki.png',
  'Keegan Joubert': '/assets/Zimbabwe Players/Keegan Joubert.png',
  'Liam Larkan': '/assets/Zimbabwe Players/Liam Larkan.png',
  'Ian Prior': '/assets/Zimbabwe Players/Ian Prior.png',
  'Lenience Tambwera': '/assets/Zimbabwe Players/Lenience Tambwera.png',
  'Tyrone Gombe': '/assets/Zimbabwe Players/Tyrone Gombe.png',
  'Brandon Mudzekenyedzi': '/assets/Zimbabwe Players/Brandon Mudzekenyedzi.png',
  'Dion Khumalo': '/assets/Zimbabwe Players/Dion Khumalo.png',
  'Kudzai Mashawi': '/assets/Zimbabwe Players/Kudzai Mashawi.png',
  'Trevor Gurwe': '/assets/Zimbabwe Players/Trevor Gurwe.png',
  'Matthew McNab': '/assets/Zimbabwe Players/Mathew McNab.png',
  'Tapiwa Mafura': '/assets/Zimbabwe Players/Tapiwa Mafura.png',
  'Takudzwa Musingwini': '/assets/Zimbabwe Players/Takudzwa Musingwini.png',
  'Edward Sigauke': '/assets/Zimbabwe Players/Edward Sigauke.png'
};

// Kenya player image mapping
const kenyaPlayerImages: Record<string, string> = {
  'Ephraim Oduor': '/assets/Kenya Simbas players/E.Oduor.png',
  'Edward Mwaura': '/assets/Kenya Simbas players/E.Mwaura.png',
  'Vincent Mwikhali': '/assets/Kenya Simbas players/V.Mwikhali.png',
  'Wilhite Mususi': '/assets/Kenya Simbas players/W.Mususi.png',
  'Teddy Akala': '/assets/Kenya Simbas players/T.Akala.png',
  'Eugine Sifuna': '/assets/Kenya Simbas players/E.Sifuna.png',
  'Hibrahim Ayoo': '/assets/Kenya Simbas players/H.Ayoo.png',
  'Thomas Okeyo': '/assets/Kenya Simbas players/T.Okeyo.png',
  'Andycole Omollo': '/assets/Kenya Simbas players/A.Omollo.png',
  'Emmanuel Slungi': '/assets/Kenya Simbas players/E.Silungi.png',
  'George Nyambua': '/assets/Kenya Simbas players/G.Nyambua.png',
  'Patrick Sabatia': '/assets/Kenya Simbas players/P.Sabatia.png',
  'David Bunduki': '/assets/Kenya Simbas players/D.Bunduki.png',
  'Obat Kuke': '/assets/Kenya Simbas players/K.Obat.png',
  'Bethuel Anami': '/assets/Kenya Simbas players/B.Anami.png',
  'Elkeans Musonye': '/assets/Kenya Simbas players/E.Musonye.png',
  'Samuel Asati': '/assets/Kenya Simbas players/S.Asati.png',
  'Brian Tanga': '/assets/Kenya Simbas players/B.Tanga.png',
  'Barry Young': '/assets/Kenya Simbas players/B.Young.png',
  'Brian Wahinya': '/assets/Kenya Simbas players/B.Wahinya.png',
  'Walter Okoth': '/assets/Kenya Simbas players/W.Okoth.png',
  'Samuel Ovwamu': '/assets/Kenya Simbas players/S.Ovwamu.png',
  'Bryceson Adaka': '/assets/Kenya Simbas players/B.Adaka.png',
  'John Okoth': '/assets/Kenya Simbas players/J.Okoth.png',
  'Griffin Chao': '/assets/Kenya Simbas players/G.Chao.png',
  'Timothy Omela': '/assets/Kenya Simbas players/T.Omela.png',
  'Jone Kubu': '/assets/Kenya Simbas players/J.Kubu.png',
  'Derick Ashiundu': '/assets/Kenya Simbas players/D.Ashiundu.png'
};

const AfricaCupTeams: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#D0E3FF]">
      {/* Header Navigation */}
      <header className="bg-scrummy-navy shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-scrummy-goldYellow transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to SCRUMMY</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/africa-cup" className="text-white hover:text-scrummy-goldYellow transition-colors">
                Tournament Hub
              </Link>
              <Link to="/africa-cup/teams" className="text-scrummy-goldYellow font-semibold">
                Teams & Rosters
              </Link>
              <Link to="/africa-cup/fixtures" className="text-white hover:text-scrummy-goldYellow transition-colors">
                Fixtures
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-scrummy-goldYellow transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 border-t border-scrummy-goldYellow/20"
            >
              <div className="space-y-2 pt-4">
                <Link to="/africa-cup" className="block text-white hover:text-scrummy-goldYellow transition-colors py-2">
                  Tournament Hub
                </Link>
                <Link to="/africa-cup/teams" className="block text-scrummy-goldYellow font-semibold py-2">
                  Teams & Rosters
                </Link>
                <Link to="/africa-cup/fixtures" className="block text-white hover:text-scrummy-goldYellow transition-colors py-2">
                  Fixtures
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Page Header */}
      <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden">
        {/* Background with geometric elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-scrummy-navy via-scrummy-blue to-blue-900">
          {/* Geometric shapes */}
          <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-br from-orange-500/30 to-red-500/30 transform skew-x-12 translate-x-16 md:translate-x-32"></div>
          <div className="absolute top-0 right-8 md:right-16 w-24 md:w-48 h-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 transform skew-x-12 translate-x-8 md:translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-28 md:w-56 h-full bg-gradient-to-tr from-teal-500/25 to-green-500/25 transform -skew-x-12 -translate-x-14 md:-translate-x-28"></div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 text-white mb-4 md:mb-6"
            >
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">8 Competing Nations</span>
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4"
            >
              Teams & Rosters
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 px-4"
            >
              Meet the warriors representing their nations in Rugby Africa Cup 2025
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/80 text-sm px-4"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full"></span>
                <span>200+ Elite Players</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full"></span>
                <span>African Champions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full"></span>
                <span>RWC 2027 Dreams</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Selector */}
      <section className="py-6 md:py-8 bg-scrummy-navy/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 md:gap-3 pb-4" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {teams.map((team, index) => (
              <motion.button
                key={team.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedTeam(team);
                  setExpandedPlayer(null);
                }}
                className={`flex-shrink-0 min-w-[120px] md:min-w-[140px]`}
              >
                <div className={`px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 border-2 ${
                  selectedTeam.id === team.id
                    ? 'border-scrummy-goldYellow bg-scrummy-goldYellow text-scrummy-navy shadow-lg'
                    : 'border-gray-300 bg-white hover:border-scrummy-goldYellow/70 hover:shadow-md'
                }`}>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-lg md:text-xl">{team.flag}</span>
                    <span className={`font-bold text-xs md:text-sm whitespace-nowrap ${
                      selectedTeam.id === team.id ? 'text-scrummy-navy' : 'text-scrummy-navy'
                    }`}>
                      {team.country}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Team Info */}
      <section className="py-6 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            key={selectedTeam.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white mb-6 md:mb-8">
              <CardContent className="p-4 md:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3 md:gap-4 text-center sm:text-left">
                    <span className="text-4xl md:text-6xl">{selectedTeam.flag}</span>
                    <div>
                      <h2 className="text-xl md:text-3xl font-black">{selectedTeam.name}</h2>
                      <p className="text-sm md:text-lg opacity-90">{selectedTeam.roster.length} squad members</p>
                    </div>
                  </div>
                  <Link to="/download">
                    <Button className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold text-sm md:text-base px-4 md:px-6">
                      <Star className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Vote in App
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Player Roster by Position */}
            <div className="space-y-6 md:space-y-8">
              {/* Forwards Section */}
              <div>
                <div className="mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-scrummy-navy">Forwards</h3>
                  <p className="text-gray-600 text-sm">The pack - power and precision</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
                  {selectedTeam.roster
                    .filter(player => ['Hooker', 'Prop', '2nd Row', 'Back Row'].includes(player.position))
                    .map((player, index) => {
                const isExpanded = expandedPlayer === `${selectedTeam.id}-${player.name}`;
                return (
                  <motion.div
                    key={`${selectedTeam.id}-${player.name}`}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.02, duration: 0.3 }}
                    layout
                  >
                    <div 
                      className="cursor-pointer group transition-all duration-300 hover:scale-[1.02] p-2"
                      onClick={() => setExpandedPlayer(isExpanded ? null : `${selectedTeam.id}-${player.name}`)}
                    >
                      {/* Player Mugshot */}
                      <div className="relative mb-3">
                        {(selectedTeam.id === 'zimbabwe' && zimbabwePlayerImages[player.name]) || 
                         (selectedTeam.id === 'kenya' && kenyaPlayerImages[player.name]) ? (
                          <img 
                            src={selectedTeam.id === 'zimbabwe' ? zimbabwePlayerImages[player.name] : kenyaPlayerImages[player.name]} 
                            alt={player.name}
                            className={`w-24 h-32 md:w-32 md:h-40 object-cover mx-auto group-hover:scale-105 transition-transform duration-300 shadow-lg border-2 border-scrummy-goldYellow rounded-lg ${
                              selectedTeam.id === 'kenya' ? 'scale-110' : ''
                            }`}
                          />
                        ) : (
                          <div className="w-24 h-32 md:w-32 md:h-40 bg-gradient-to-br from-scrummy-navy to-scrummy-blue rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300 shadow-lg">
                            <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                          </div>
                        )}
                        {isExpanded && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                            <span className="text-xs md:text-sm text-scrummy-navy">✓</span>
                          </div>
                        )}
                      </div>

                      {/* Player Info - Always Visible */}
                      <div className="text-center space-y-2 mb-3">
                        <h3 className="font-bold text-scrummy-navy text-xs md:text-sm leading-tight">{player.name}</h3>
                        <span className="inline-block bg-scrummy-goldYellow/20 text-scrummy-goldYellow font-semibold text-xs px-2 py-1 rounded-full">
                          {player.position}
                        </span>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-3 border-t border-gray-200 pt-3 mt-3"
                        >
                          <div className="text-center space-y-2">
                            <div className="flex flex-wrap justify-center gap-1">
                              {player.age && (
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              Age {player.age}
                            </span>
                              )}
                              {player.height && (
                                <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                  {player.height}
                                </span>
                              )}
                              {player.weight && (
                                <span className="inline-block bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                  {player.weight}
                                </span>
                              )}
                              {player.club && (
                                <span className="inline-block bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                                  {player.club}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600 text-xs leading-relaxed text-center">{player.info}</p>
                          
                          {/* Vote Button */}
                          <Link to="/download">
                            <button 
                              className="w-full bg-gradient-to-r from-scrummy-goldYellow to-yellow-400 text-scrummy-navy font-bold text-xs py-2 px-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              ⭐ Vote Top Dawg
                            </button>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
                   })}
                </div>
              </div>

              {/* Backs Section */}
              <div>
                <div className="mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-scrummy-navy">Backs</h3>
                  <p className="text-gray-600 text-sm">Speed, skill and finesse</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
                  {selectedTeam.roster
                    .filter(player => ['Half Back', 'Fly Half', 'Centre', 'Outside Back'].includes(player.position))
                    .map((player, index) => {
                const isExpanded = expandedPlayer === `${selectedTeam.id}-${player.name}`;
                return (
                  <motion.div
                    key={`${selectedTeam.id}-${player.name}`}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.02, duration: 0.3 }}
                    layout
                  >
                    <div 
                      className="cursor-pointer group transition-all duration-300 hover:scale-[1.02] p-2"
                      onClick={() => setExpandedPlayer(isExpanded ? null : `${selectedTeam.id}-${player.name}`)}
                    >
                      {/* Player Mugshot */}
                      <div className="relative mb-3">
                        {(selectedTeam.id === 'zimbabwe' && zimbabwePlayerImages[player.name]) || 
                         (selectedTeam.id === 'kenya' && kenyaPlayerImages[player.name]) ? (
                          <img 
                            src={selectedTeam.id === 'zimbabwe' ? zimbabwePlayerImages[player.name] : kenyaPlayerImages[player.name]} 
                            alt={player.name}
                            className={`w-24 h-32 md:w-32 md:h-40 object-cover mx-auto group-hover:scale-105 transition-transform duration-300 shadow-lg border-2 border-scrummy-goldYellow rounded-lg ${
                              selectedTeam.id === 'kenya' ? 'scale-110' : ''
                            }`}
                          />
                        ) : (
                          <div className="w-24 h-32 md:w-32 md:h-40 bg-gradient-to-br from-scrummy-navy to-scrummy-blue rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300 shadow-lg">
                            <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                          </div>
                        )}
                        {isExpanded && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                            <span className="text-xs md:text-sm text-scrummy-navy">✓</span>
                          </div>
                        )}
                      </div>

                      {/* Player Info - Always Visible */}
                      <div className="text-center space-y-2 mb-3">
                        <h3 className="font-bold text-scrummy-navy text-xs md:text-sm leading-tight">{player.name}</h3>
                        <span className="inline-block bg-scrummy-goldYellow/20 text-scrummy-goldYellow font-semibold text-xs px-2 py-1 rounded-full">
                          {player.position}
                        </span>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-3 border-t border-gray-200 pt-3 mt-3"
                        >
                          <div className="text-center space-y-2">
                            <div className="flex flex-wrap justify-center gap-1">
                              {player.age && (
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              Age {player.age}
                            </span>
                              )}
                              {player.height && (
                                <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                  {player.height}
                                </span>
                              )}
                              {player.weight && (
                                <span className="inline-block bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                  {player.weight}
                                </span>
                              )}
                              {player.club && (
                                <span className="inline-block bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                                  {player.club}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600 text-xs leading-relaxed text-center">{player.info}</p>
                          
                          {/* Vote Button */}
                          <Link to="/download">
                            <button 
                              className="w-full bg-gradient-to-r from-scrummy-goldYellow to-yellow-400 text-scrummy-navy font-bold text-xs py-2 px-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              ⭐ Vote Top Dawg
                            </button>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
                   })}
                </div>
              </div>
            </div>

            {/* App Download CTA */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 md:mt-12"
            >
              <Card className="bg-scrummy-navy/5 border-scrummy-goldYellow border-2">
                <CardContent className="p-6 md:p-8 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-scrummy-navy mb-3">Cast Your Vote!</h3>
                  <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-sm md:text-base">
                    Download the SCRUMMY app to vote for {selectedTeam.name} and your favorite players. 
                    Join thousands of rugby fans making their voices heard!
                  </p>
                  <Link to="/download">
                    <Button 
                      size="lg" 
                      className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold px-6 md:px-8 py-3 text-base md:text-lg"
                    >
                      📱 Play SCRUMMY App Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AfricaCupTeams; 