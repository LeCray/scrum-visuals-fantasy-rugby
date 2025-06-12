import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { generateMatchId, getBoxScore, getFinalScore } from "@/lib/boxScoreData";

// Define types for our fixtures data
type Fixture = {
  time: string;
  teamA: string;
  teamB: string;
  status?: 'cancelled';
  location?: string;
};

type FixtureDay = {
  date: string;
  day: string;
  fixtures: Fixture[];
  month?: string;
};

const tabs = [
  { name: "CBZ Schools Rugby", key: "sbr2025" },
  { name: "SA Schools Rugby", key: "sa_schools" },
  { name: "Zim Sables Games", key: "zim" },
  { name: "Derby Day", key: "derby" }
];

// Map to track cancelled games
const cancelledGames = [
  { date: "April 29th", time: "9:00", teamA: "CHURCHILL 2XV", teamB: "LOMAGUNDI 2XV" }
];

const isCancelledGame = (date: string, time: string, teamA: string, teamB: string) => {
  return cancelledGames.some(game => 
    game.date === date && 
    game.time === time && 
    game.teamA === teamA && 
    game.teamB === teamB
  );
};

// Fixture data
const derbyDay: FixtureDay[] = [  {
    date: "April 28th",
    day: "Monday",
    fixtures: [
      { time: "9:00",  teamA: "EAGLESVALE 2XV",  teamB: "WATERSHED 2XV" },
      { time: "10:20", teamA: "GOLDRIDGE 1XV",   teamB: "GATEWAY 1XV" },
      { time: "11:40", teamA: "WATERSHED 1XV",  teamB: "MIDLANDS CC 1XV" },
      { time: "13:00", teamA: "MILTON 1XV",     teamB: "WISE OWL 1XV" },
      { time: "14:20", teamA: "HILLCREST 1XV",  teamB: "EAGLESVALE 1XV" },
      { time: "15:40", teamA: "RYDINGS 1XV",    teamB: "HERITAGE 1XV" }
    ]
  },
  {
    date: "April 29th",
    day: "Tuesday",
    fixtures: [
      { time: "9:00",  teamA: "CHURCHILL 2XV", teamB: "LOMAGUNDI 2XV" },
      { time: "10:20", teamA: "FALCON 2XV",    teamB: "ST ALBANS 2XV" },
      { time: "11:40", teamA: "PETERHOUSE 2XV",teamB: "ST GEORGE'S 2XV" },
      { time: "13:00", teamA: "ST JOHN'S 2XV", teamB: "PRINCE EDWARD'S 2XV" },
      { time: "14:20", teamA: "LOMAGUNDI 1XV", teamB: "ST ALBANS 1XV" },
      { time: "15:40", teamA: "ST GEORGE'S 1XV",teamB: "ST ANDREW'S 1XV" }
    ]
  },
  {
    date: "April 30th",
    day: "Wednesday",
    fixtures: [
      { time: "9:00",  teamA: "WISE OWL 2XV", teamB: "LOMAGUNDI 2XV" },
      { time: "10:20", teamA: "WATERSHED 2XV", teamB: "CBC 2XV" },
      { time: "11:40", teamA: "RYDINGS 1XV",   teamB: "MIDLANDS CC 1XV" },
      { time: "13:00", teamA: "GOLDRIDGE 1XV", teamB: "HILLCREST 1XV" },
      { time: "14:20", teamA: "EAGLESVALE 1XV",teamB: "HERITAGE 1XV" },
      { time: "15:40", teamA: "WATERSHED 1XV", teamB: "GATEWAY 1XV" }
    ]
  },
  {
    date: "May 1st",
    day: "Thursday",
    fixtures: [
      { time: "8:00",  teamA: "ST GEORGE'S 2XV",  teamB: "ST ALBANS 2XV" },
      { time: "9:20",  teamA: "ST GEORGE'S 1XV",  teamB: "PRINCE EDWARD 1XV" },
      { time: "10:40", teamA: "CBC 1XV",          teamB: "FALCON 1XV" },
      { time: "12:00", teamA: "LOMAGUNDI 1XV",   teamB: "CHURCHILL 1XV" },
      { time: "13:20", teamA: "PETERHOUSE 1XV", teamB: "ST ANDREW'S 1XV" },
      { time: "14:40", teamA: "ST JOHN'S 1XV",   teamB: "ST ALBANS 1XV" },
      { time: "16:00", teamA: "ZAM STEELERS",    teamB: "SHARKS ACADEMY" }
    ]
  },
  {
    date: "May 2nd",
    day: "Friday",
    fixtures: [
      { time: "9:00",  teamA: "MILTON 2XV",      teamB: "WISE OWL 2XV" },
      { time: "10:20", teamA: "EAGLESVALE 2XV", teamB: "CBC 2XV" },
      { time: "11:40", teamA: "MILTON 1XV",     teamB: "LOMAGUNDI 2XV" },
      { time: "13:00", teamA: "PRINCE EDWARD 2XV", teamB: "LORD BRIGHTON 2XV" },
      { time: "14:20", teamA: "RYDINGS 1XV",    teamB: "WISE OWL 1XV" },
      { time: "15:40", teamA: "PETERHOUSE 2XV",teamB: "FALCON 2XV" }
    ]
  },
  {
    date: "May 3rd",
    day: "Saturday",
    fixtures: [
      { time: "9:00",  teamA: "ST JOHN'S 2XV",  teamB: "ST ALBANS 2XV" },
      { time: "10:20", teamA: "CBC 1XV",       teamB: "PETERHOUSE 1XV" },
      { time: "11:40", teamA: "PRINCE EDWARD 1XV", teamB: "CHURCHILL 1XV" },
      { time: "13:00", teamA: "LOMAGUNDI 1XV",teamB: "ST GEORGE'S 1XV" },
      { time: "14:20", teamA: "FALCON 1XV",    teamB: "ST ALBANS 1XV" },
      { time: "15:40", teamA: "ST JOHN'S 1XV", teamB: "ST ANDREW'S 1XV" }
    ]
  }
];

const zimSablesGames: FixtureDay[] = [ {
    date: "May 4th",
    day: "Sunday",
    fixtures: [
      { time: "11:30", teamA: "ZIMBABWE U20", teamB: "SHARKS ACADEMY" },
      { time: "14:30", teamA: "ZIMBABWE SABLES", teamB: "ZAMBIA" }
    ]
  }
];

// South Africa Schools Rugby fixtures
const saSchoolsRugby: FixtureDay[] = [
  {
    date: "May 16th",
    day: "Friday",
    month: "May",
    fixtures: [
      { time: "TBD", teamA: "TIER 2 URBAN", teamB: "TIER 2 CD" },
      { time: "TBD", teamA: "ST CHARLES COLLEGE", teamB: "CLIFTON SCHOOL" },
      { time: "TBD", teamA: "MICHAELHOUSE", teamB: "NORTHWOOD SCHOOL" },
      { time: "TBD", teamA: "KEARSNEY COLLEGE", teamB: "DURBAN HIGH SCHOOL" },
      { time: "TBD", teamA: "MARITZBURG COLLEGE", teamB: "WESTVILLE BOYS' HIGH SCHOOL" },
      { time: "TBD", teamA: "HILTON COLLEGE", teamB: "GLENWOOD HIGH SCHOOL" }
    ]
  },
  {
    date: "May 24th",
    day: "Saturday",
    month: "May",
    fixtures: [
      { time: "TBD", teamA: "QUEEN'S COLLEGE", teamB: "GREY HIGH SCHOOL", location: "Away" }
    ]
  },
  {
    date: "May 31st",
    day: "Saturday",
    month: "May",
    fixtures: [
      { time: "TBD", teamA: "GREY HIGH SCHOOL", teamB: "ST ANDREW'S", location: "LOWER FIELD" },
      { time: "TBD", teamA: "MARITZBURG COLLEGE", teamB: "KEARSNEY COLLEGE"},
      { time: "TBD", teamA: "WESTVILLE BOYS' HIGH SCHOOL", teamB: "GLENWOOD HIGH SCHOOL"},
      { time: "TBD", teamA: "PRETORIA BOYS HIGH SCHOOL", teamB: "MICHEALHOUSE" },
      { time: "TBD", teamA: "DURBAN HIGH SCHOOL", teamB: "HILTON COLLEGE"},
      { time: "TBD", teamA: "GREYTOWN HIGH SCHOOL", teamB: "LADYSMITH HIGH SCHOOL"},
      { time: "TBD", teamA: "NEWCASTLE HIGH SCHOOL", teamB: "PONGOLA AKADEMIE"},
      { time: "TBD", teamA: "VRYHEID LANDBOU SCHOOL", teamB: "DUNDEE HIGH SCHOOL"}
    ]
  },
  {
    date: "June 7th",
    day: "Saturday",
    month: "June",
    fixtures: [
      { time: "TBD", teamA: "GREY HIGH SCHOOL", teamB: "DANIEL PIENAAR", location: "Home" }
    ]
  },
  {
    date: "July 26th",
    day: "Saturday",
    month: "July",
    fixtures: [
      { time: "TBD", teamA: "GREY HIGH SCHOOL", teamB: "FRAMESBY", location: "Home" }
    ]
  },
  {
    date: "August 2nd",
    day: "Saturday",
    month: "August",
    fixtures: [
      { time: "TBD", teamA: "GREY HIGH SCHOOL", teamB: "GREY COLLEGE", location: "Home" }
    ]
  },
  {
    date: "August 9th",
    day: "Saturday",
    month: "August",
    fixtures: [
      { time: "TBD", teamA: "MUIR", teamB: "GREY HIGH SCHOOL", location: "Away" }
    ]
  },
  {
    date: "August 16th",
    day: "Saturday",
    month: "August",
    fixtures: [
      { time: "TBD", teamA: "SELBORNE", teamB: "GREY HIGH SCHOOL", location: "Away" }
    ]
  }
];

const week1Games: FixtureDay[] = [];

// SBR Season 2025 fixtures organized by week with month information
const sbr2025Games: FixtureDay[] = [
  {
    date: "Week 1",
    day: "17 May",
    month: "May",
    fixtures: [
      { time: "14:00", teamA: "ST JOHNS", teamB: "PRINCE EDWARD", location: "St John's College, Harare" },
      { time: "14:00", teamA: "KYLE", teamB: "ST GEORGES", location: "Kyle College, Masvingo" },
      { time: "14:00", teamA: "GATEWAY", teamB: "HILLCREST", location: "Gateway High School, Harare" },
      { time: "14:00", teamA: "HELLENIC", teamB: "WATERSHED", location: "Hellenic Academy, Harare" },
      { time: "14:00", teamA: "PETERHOUSE", teamB: "CBC", location: "Peterhouse Boys, Marondera" },
      { time: "14:00", teamA: "ALLAN WILSON", teamB: "MILTON", location: "Allan Wilson, Harare" },
      { time: "14:00", teamA: "MIDLANDS CC", teamB: "HERITAGE", location: "MCC, Gweru" },
      { time: "14:00", teamA: "GOLDRIDGE", teamB: "EAGLESVALE", location: "Goldridge, Kwekwe" },
      { time: "14:30", teamA: "WISE OWL", teamB: "CHURCHILL", location: "Wise Owl, Marondera" },
      { time: "15:15", teamA: "LOMAGUNDI", teamB: "FALCON", location: "Lomagundi College, Chinhoyi" },
      { time: "TBA", teamA: "NATTIE COLLEGE", teamB: "RYDINGS", location: "Nattie College, Harare" }
    ]
  },
  {
    date: "Week 2",
    day: "24 May",
    month: "May",
    fixtures: [
      { time: "11:30", teamA: "GATEWAY", teamB: "HERITAGE" },
      { time: "12:30", teamA: "WATERSHED", teamB: "HILLCREST", location: "Watershed College, Marondera" },
      { time: "15:00", teamA: "HELLENIC", teamB: "EAGLESVALE", location: "Eaglesvale, Harare" },
      { time: "15:30", teamA: "PRINCE EDWARD", teamB: "CHURCHILL", location: 
        "Prince Edward, Harare" },
      { time: "15:30", teamA: "ST GEORGES", teamB: "ST JOHNS", location: "St George's College, Harare" },
      { time: "15:30", teamA: "FALCON", teamB: "CBC" },
      { time: "TBD", teamA: "PETERHOUSE", teamB: "LOMAGUNDI" }
    ]
  },
  {
    date: "Week 3",
    day: "07 June",
    month: "June",
    fixtures: [
      { time: "09:00", teamA: "ST GEORGES 4TH", teamB: "ALLAN WILSON 1ST" },
      { time: "10:30", teamA: "PETRA", teamB: "GATEWAY" },
      { time: "12:05", teamA: "MIDLANDS CC", teamB: "GOLDRIDGE" },
      { time: "12:30", teamA: "HERITAGE", teamB: "RYDINGS" },
      { time: "12:30", teamA: "ELIS ROBINS", teamB: "MUTARE" },
      { time: "12:50", teamA: "PRINCE EDWARD", teamB: "HILLCREST" },
      { time: "13:20", teamA: "MILTON", teamB: "CHURCHILL" },
      { time: "14:00", teamA: "ST GEORGES", teamB: "LOMAGUNDI" },
      { time: "14:45", teamA: "HELLENIC", teamB: "ST JOHNS" },
      { time: "15:00", teamA: "WISE OWL", teamB: "PLUMTREE" },
      { time: "15:30", teamA: "KYLE", teamB: "WATERSHED" },
      { time: "15:30", teamA: "FALCON", teamB: "PETERHOUSE" },
      { time: "15:30", teamA: "CBC", teamB: "EAGLESVALE" }
    ]
  },
  {
    date: "Week 4",
    day: "14 June",
    month: "June",
    fixtures: [
      { time: "11:30", teamA: "MIDLANDS CC", teamB: "GATEWAY" },
      { time: "12:00", teamA: "BMC", teamB: "ELLIS ROBINS SCHOOL" },
      { time: "12:00", teamA: "MILTON", teamB: "WISE OWL" },
      { time: "12:30", teamA: "MUTARE", teamB: "VICTORIA HIGH" },
      { time: "13:00", teamA: "HILLCREST", teamB: "WATERSHED" },
      { time: "13:30", teamA: "HELLENIC", teamB: "HERITAGE" },
      { time: "14:45", teamA: "PETERHOUSE", teamB: "ST JOHNS" },
      { time: "15:00", teamA: "CHURCHILL", teamB: "ALLAN WILSON" },
      { time: "15:00", teamA: "EAGLESVALE", teamB: "PETRA" },
      { time: "15:30", teamA: "FALCON", teamB: "ST GEORGES" },
      { time: "15:30", teamA: "KYLE", teamB: "LOMAGUNDI" },
      { time: "TBD", teamA: "GOROMONZI", teamB: "CRENBORNE" },
      { time: "TBD", teamA: "ST JOHNS HIGH", teamB: "KUTAMA" }
    ]
  },
  {
    date: "Week 5",
    day: "28 June",
    month: "June",
    fixtures: [
      { time: "TBD", teamA: "LOMAGUNDI", teamB: "CHURCHILL" },
      { time: "TBD", teamA: "PRINCE EDWARD", teamB: "EAGLESVALE" },
      { time: "TBD", teamA: "ST GEORGES", teamB: "CBC" },
      { time: "TBD", teamA: "ST JOHNS", teamB: "FALCON" },
      { time: "TBD", teamA: "HERITAGE", teamB: "WATERSHED" },
      { time: "TBD", teamA: "HELLENIC", teamB: "PETERHOUSE" },
      { time: "TBD", teamA: "MUTARE", teamB: "HILLCREST" },
      { time: "TBD", teamA: "PETRA", teamB: "MIDLANDS CC" }
    ]
  },
  {
    date: "Week 6",
    day: "05 July",
    month: "July",
    fixtures: [
      { time: "TBD", teamA: "PH 7s", teamB: "" },
      { time: "TBD", teamA: "ALLAN WILSON", teamB: "CHURCHILL" },
      { time: "TBD", teamA: "WATERSHED", teamB: "EAGLESVALE" },
      { time: "TBD", teamA: "HERITAGE", teamB: "WISE OWL" }
    ]
  },
  {
    date: "Week 7",
    day: "12 July",
    month: "July",
    fixtures: [
      { time: "TBD", teamA: "ST JOHNS", teamB: "LOMAGUNDI" },
      { time: "TBD", teamA: "WISE OWL", teamB: "PRINCE EDWARD" },
      { time: "TBD", teamA: "HELLENIC", teamB: "FALCON" },
      { time: "TBD", teamA: "CBC", teamB: "MILTON" }
    ]
  },
  {
    date: "Week 8",
    day: "19 July",
    month: "July",
    fixtures: [
      { time: "TBD", teamA: "ST GEORGES", teamB: "PRINCE EDWARD" },
      { time: "TBD", teamA: "ST JOHNS", teamB: "PH" },
      { time: "TBD", teamA: "ALLAN WILSON", teamB: "MILTON" },
      { time: "TBD", teamA: "EAGLESVALE", teamB: "GATEWAY" },
      { time: "TBD", teamA: "HELLENIC", teamB: "LOMAGUNDI" },
      { time: "TBD", teamA: "ST IGNATIUS", teamB: "GOROMONZI" }
    ]
  },
  {
    date: "Week 9",
    day: "26 July",
    month: "July",
    fixtures: [
      { time: "TBD", teamA: "CHURCHILL", teamB: "PRINCE EDWARD" },
      { time: "TBD", teamA: "ST JOHNS", teamB: "ST GEORGES" },
      { time: "TBD", teamA: "ALLAN WILSON", teamB: "ST IGNATIUS" },
      { time: "TBD", teamA: "GATEWAY", teamB: "RYDINGS" }
    ]
  },
  {
    date: "Week 10",
    day: "02 Aug",
    month: "August",
    fixtures: [
      { time: "TBD", teamA: "CHURCHILL", teamB: "PLUMTREE" },
      { time: "TBD", teamA: "LOMAGUNDI", teamB: "PRINCE EDWARD" },
      { time: "TBD", teamA: "PETERHOUSE", teamB: "ST GEORGES" },
      { time: "TBD", teamA: "FALCON", teamB: "ST JOHNS" },
      { time: "TBD", teamA: "GATEWAY", teamB: "WATERSHED" },
      { time: "TBD", teamA: "HERITAGE", teamB: "KYLE" },
      { time: "TBD", teamA: "MARONDERA HIGH", teamB: "MUTARE" },
      { time: "TBD", teamA: "HELLENIC", teamB: "CBC" },
      { time: "TBD", teamA: "GIFFORD", teamB: "MILTON" },
      { time: "TBD", teamA: "GOLDRIDGE", teamB: "PETRA" }
    ]
  }
];

// Map team names to logo paths
const teamLogoMap: Record<string, string> = {
  "ZIMBABWE U20": "/assets/ZimbabweU20.png",
  "SHARKS ACADEMY": "/assets/SharksAcademy.png",
  "ZIMBABWE SABLES": "/assets/ZimSables.png",
  "ZAMBIA": "/assets/Zambia.png",
  "EAGLESVALE 2XV": "/assets/Eaglesvale.png",
  "WATERSHED 2XV": "/assets/Watershed.png",
  "GOLDRIDGE 1XV": "/assets/Goldridge.png",
  "GATEWAY 1XV": "/assets/Gateway.png",
  "WATERSHED 1XV": "/assets/Watershed.png",
  "WATERSHED": "/assets/Watershed.png",
  "MIDLANDS CC 1XV": "/assets/MidlandsCC.png",
  "MILTON 1XV": "/assets/Milton.png",
  "WISE OWL 1XV": "/assets/WiseOwl.png",
  "HILLCREST 1XV": "/assets/Hillcrest.png",
  "EAGLESVALE 1XV": "/assets/Eaglesvale.png",
  "RYDINGS 1XV": "/assets/Rydings.png",
  "RYDINGS": "/assets/Rydings.png",
  "HERITAGE 1XV": "/assets/Heritage.png",
  "CHURCHILL 2XV": "/assets/Churchill.png",
  "LOMAGUNDI 2XV": "/assets/Lomagundi.png",
  "FALCON 2XV": "/assets/Falcon.png",
  "ST ALBANS 2XV": "/assets/StAlbans.png",
  "PETERHOUSE 2XV": "/assets/Peterhouse.png",
  "ST GEORGE'S 2XV": "/assets/StGeorges.png",
  "ST GEORGE'S": "/assets/StGeorges.png",
  "ST JOHN'S 2XV": "/assets/StJohns.png",
  "PRINCE EDWARD'S 2XV": "/assets/PrinceEdward.png",
  "LOMAGUNDI 1XV": "/assets/Lomagundi.png",
  "LOMAGUNDI": "/assets/Lomagundi.png",
  "ST ALBANS 1XV": "/assets/StAlbans.png",
  "ST GEORGE'S 1XV": "/assets/StGeorges.png",
  "ST ANDREW'S 1XV": "/assets/StAndrews.png",
  "CBC 2XV": "/assets/CBC.png",
  "CBC": "/assets/CBC.png",
  "PRINCE EDWARD 1XV": "/assets/PrinceEdward.png",
  "CBC 1XV": "/assets/CBC.png",
  "FALCON 1XV": "/assets/Falcon.png",
  "FALCON": "/assets/Falcon.png",
  "CHURCHILL 1XV": "/assets/Churchill.png",
  "ST JOHN'S 1XV": "/assets/StJohns.png",
  "ST JOHN'S": "/assets/StJohns.png",
  "ZAM STEELERS": "/assets/ZamSteelers.png",
  "PETERHOUSE 1XV": "/assets/Peterhouse.png",
  "PETERHOUSE": "/assets/Peterhouse.png",
  "MILTON 2XV": "/assets/Milton.png",
  "WISE OWL 2XV": "/assets/WiseOwl.png",
  "PRINCE EDWARD 2XV": "/assets/PrinceEdward.png",
  "LORD BRIGHTON 2XV": "/assets/LordBrighton.png",
  
  // SBR Season 2025 teams
  "WISE OWL": "/assets/WiseOwl.png",
  "CHURCHILL": "/assets/Churchill.png",
  "ST JOHNS": "/assets/StJohns.png",
  "PRINCE EDWARD": "/assets/PrinceEdward.png",
  "KYLE": "/assets/Kyle.png",
  "ST GEORGES": "/assets/StGeorges.png",
  "ST GEORGES 4TH": "/assets/StGeorges.png",
  "GATEWAY": "/assets/Gateway.png",
  "HILLCREST": "/assets/Hillcrest.png",
  "HELLENIC": "/assets/Hellenic.png",
  "HERITAGE": "/assets/Heritage.png",
  "ALLAN WILSON": "/assets/Allan Wilson.png",
  "ALLAN WILSON 1ST": "/assets/Allan Wilson.png",
  "CRENBORNE": "/assets/logo.png",
  "MILTON": "/assets/Milton.png",
  "PH": "/assets/Peterhouse.png",
  "PH 7s": "/assets/Peterhouse.png",
  "ST IGNATIUS": "/assets/St Ignatius.png",
  "NATTIE COLLEGE": "/assets/Nattie.png",
  "GOROMONZI": "/assets/Goromonzi.png",
  "ST JOHNS HIGH": "/assets/STJOHNSHIGH.png",
  "KUTAMA": "/assets/Kutama.png",
  "MUTARE": "/assets/Mutare Boys High.png",
  "PETRA": "/assets/Petra College.png",
  "MIDLANDS CC": "/assets/MidlandsCC.png",
  "PLUMTREE": "/assets/logo.png",
  "MARONDERA HIGH": "/assets/Marondera high.png",
  "GIFFORD": "/assets/logo.png",
  
  // South African Schools
  "TIER 2 URBAN": "/assets/logo.png", // Placeholder
  "TIER 2 CD": "/assets/logo.png", // Placeholder
  "ST CHARLES COLLEGE": "/assets/SA logos/SA schools (Logo)/St Charles.png",
  "CLIFTON SCHOOL": "/assets/SA logos/SA schools (Logo)/Clifton.png",
  "MICHAELHOUSE": "/assets/SA logos/SA schools (Logo)/Michaelhouse.png",
  "MICHEALHOUSE": "/assets/SA logos/SA schools (Logo)/Michaelhouse.png", // Alternative spelling
  "NORTHWOOD SCHOOL": "/assets/SA logos/SA schools (Logo)/Northwood.png",
  "KEARSNEY COLLEGE": "/assets/SA logos/SA schools (Logo)/Kearsney College.png",
  "DURBAN HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Durban High school.png",
  "MARITZBURG COLLEGE": "/assets/SA logos/SA schools (Logo)/Maritzburg.png",
  "WESTVILLE BOYS' HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Westville Boy's High School.png",
  "HILTON COLLEGE": "/assets/SA logos/SA schools (Logo)/Hilton College.png",
  "GLENWOOD HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Glenwood High School.png",
  "AMANZIMTOTI HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Amanzimtoti High School.png",
  "KING EDWARD HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/King Edward.png",
  "CURRO HILLCREST": "/assets/SA logos/SA schools (Logo)/Curro Hillcrest.png",
  "ASHTON COLLEGE BALLITO": "/assets/SA logos/SA schools (Logo)/Ashton college.png",
  "KINGSWAY HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Kingsway High school.png",
  "HILLCREST HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Hillcrest high school.png",
  "PORT SHEPSTONE HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Port Shepstone high school.png",
  "IXOPO HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Ixopo.png",
  "DUNDEE HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Dundee high school.png",
  "GREYTOWN HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Greytown.png",
  "SAREL CILLIERS HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Sarel Cilliers high school.png",
  "NEWCASTLE HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Newcastle.png",
  "VRYHEID HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Vryheid high school.png",
  "VRYHEID LANDBOU SCHOOL": "/assets/SA logos/SA schools (Logo)/VRYHEID LANDBOU SCHOOL.png",
  "HOËRSKOOL RICHARDSBAAI": "/assets/SA logos/SA schools (Logo)/Hoërskool Richardsbaai.png",
  "WERDA SCHOOL": "/assets/SA logos/SA schools (Logo)/Werda.png",
  "PORT NATAL SCHOOL": "/assets/SA logos/SA schools (Logo)/Port Natal.png",
  "HOËRSKOOL PIONIER": "/assets/SA logos/SA schools (Logo)/Hoërskool Pionier.png",
  "EMPANGENI HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/Empangeni.png",
  "GRANTLEIGH": "/assets/SA logos/SA schools (Logo)/Grantleigh.png",
  "FELIXTON COLLEGE": "/assets/SA logos/SA schools (Logo)/Felixton College.png",
  "PONGOLA AKADEMIE": "/assets/SA logos/SA schools (Logo)/PONGOLA AKADEMIE.png",
  "LADYSMITH HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/LADYSMITH HIGH SCHOOL.png",
  "PRETORIA BOYS HIGH SCHOOL": "/assets/SA logos/SA schools (Logo)/PRETORIA BOYS HIGH SCHOOL College.png",
  
  // Grey High School fixtures teams
  "GREY HIGH SCHOOL": "/assets/SA logos/Grey High School.png", 
  "MEYER SAUERMAN": "/assets/logo.png", // Placeholder
  "QUEEN'S COLLEGE": "/assets/SA logos/QueensCollege.png",
  "ST ANDREW'S": "/assets/StAndrews.png",
  "DANIEL PIENAAR": "/assets/SA logos/Daniel Pienaar school.png",
  "FRAMESBY": "/assets/SA logos/framesby school.png",
  "GREY COLLEGE": "/assets/SA logos/Grey College.png",
  "MUIR": "/assets/SA logos/Muir College.png",
  "SELBORNE": "/assets/SA logos/Selborne College.png",

  "GOLDRIDGE": "/assets/Goldridge.png",
  "EAGLESVALE": "/assets/Eaglesvale.png"

};

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

// Add function to check if a fixture is highlighted
const isHighlightedFixture = (date: string, time: string, teamA: string, teamB: string) => {
  const highlightedGames = [
    { date: "TODAY", time: "11:30", teamA: "ZIMBABWE U20", teamB: "SHARKS ACADEMY" },
    { date: "TODAY", time: "14:30", teamA: "ZIMBABWE SABLES", teamB: "ZAMBIA" },
    { date: "April 28th", time: "13:00", teamA: "MILTON 1XV", teamB: "WISE OWL 1XV" },
    { date: "April 28th", time: "15:40", teamA: "RYDINGS 1XV", teamB: "HERITAGE 1XV" },
    { date: "April 29th", time: "14:20", teamA: "LOMAGUNDI 1XV", teamB: "ST ALBANS 1XV" },
    { date: "April 29th", time: "15:40", teamA: "ST GEORGE'S 1XV", teamB: "ST ANDREW'S 1XV" },
    { date: "April 30th", time: "13:00", teamA: "GOLDRIDGE 1XV", teamB: "HILLCREST 1XV" },
    { date: "April 30th", time: "15:40", teamA: "WATERSHED 1XV", teamB: "GATEWAY 1XV" },
    { date: "May 1st", time: "13:20", teamA: "PETERHOUSE 1XV", teamB: "ST ANDREW'S 1XV" },
    { date: "May 1st", time: "16:00", teamA: "ZAM STEELERS", teamB: "SHARKS ACADEMY" },
    { date: "May 3rd", time: "10:20", teamA: "CBC 1XV", teamB: "PETERHOUSE 1XV" },
    { date: "May 3rd", time: "11:40", teamA: "PRINCE EDWARD 1XV", teamB: "CHURCHILL 1XV" },
    { date: "May 3rd", time: "14:20", teamA: "FALCON 1XV", teamB: "ST ALBANS 1XV" },
    { date: "May 3rd", time: "15:40", teamA: "ST JOHN'S 1XV", teamB: "ST ANDREW'S 1XV" },
    { date: "Week 1", time: "14:00", teamA: "HELLENIC", teamB: "WATERSHED" },
    { date: "Week 1", time: "15:15", teamA: "LOMAGUNDI", teamB: "FALCON" }
  ];

  return highlightedGames.some(game => 
    game.date === date && 
    game.time === time && 
    game.teamA === teamA && 
    game.teamB === teamB
  );
};

// Helper to parse conversions and penalty kicks from summary string
function parseConversions(conversionStr: string) {
  // e.g. "1/1 PK" or "1/1" or "1/1 C, 2/2 PK" or "-"
  if (!conversionStr || conversionStr === "-") return { conversions: 0, penalties: 0 };
  let conversions = 0;
  let penalties = 0;
  // Split by comma if both are present
  const parts = conversionStr.split(',').map(s => s.trim());
  for (const part of parts) {
    if (part.includes('PK')) {
      const match = part.match(/(\d+)\/(\d+) PK/);
      if (match) {
        penalties += parseInt(match[1], 10);
      }
    } else if (part.includes('C')) {
      const match = part.match(/(\d+)\/(\d+) C/);
      if (match) {
        conversions += parseInt(match[1], 10);
      }
    } else {
      // fallback: if just "1/1" assume conversions
      const match = part.match(/(\d+)\/(\d+)/);
      if (match) {
        conversions += parseInt(match[1], 10);
      }
    }
  }
  return { conversions, penalties };
}

const Fixtures: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("sbr2025");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [teamSearchInput, setTeamSearchInput] = useState("");
  const [cbzTeamSearchInput, setCbzTeamSearchInput] = useState("");

  const handleFixtureClick = (date: string, time: string, teamA: string, teamB: string) => {
    if (isHighlightedFixture(date, time, teamA, teamB)) {
      const matchId = generateMatchId(date, time, teamA, teamB);
      navigate(`/box-score/${matchId}`);
    }
  };

  // Handle search input changes
  const handleTeamSearch = (input: string) => {
    setTeamSearchInput(input);
  };

  // Handle clear search
  const clearTeamSearch = () => {
    setTeamSearchInput("");
  };

  // Handle CBZ team search input changes
  const handleCbzTeamSearch = (input: string) => {
    setCbzTeamSearchInput(input);
  };

  // Handle clear CBZ team search
  const clearCbzTeamSearch = () => {
    setCbzTeamSearchInput("");
  };

  const filteredFixtures = (activeTab: string): FixtureDay[] => {
    if (activeTab === "derby") return derbyDay;
    if (activeTab === "zim") return zimSablesGames;
    if (activeTab === "sa_schools") {
      let fixtures = saSchoolsRugby;
      
      // Filter by month if a specific month is selected
      if (selectedMonth !== "All") {
        fixtures = fixtures.filter(day => day.month === selectedMonth);
      }
      
      // Filter by team search input
      if (teamSearchInput.trim() !== "") {
        const searchTerm = teamSearchInput.toUpperCase();
        fixtures = fixtures.map(day => {
          const filteredMatches = day.fixtures.filter(fixture => 
            fixture.teamA.includes(searchTerm) || fixture.teamB.includes(searchTerm)
          );
          
          return filteredMatches.length > 0 
            ? { ...day, fixtures: filteredMatches } 
            : null;
        }).filter(Boolean) as FixtureDay[];
      }
      
      return fixtures;
    }
    if (activeTab === "sbr2025") {
      let fixtures = sbr2025Games;
      
      // Filter by month
      if (selectedMonth !== "All") {
        fixtures = fixtures.filter(day => day.month === selectedMonth);
      }
      
      // Filter by CBZ team search
      if (cbzTeamSearchInput.trim() !== "") {
        const searchTerm = cbzTeamSearchInput.toUpperCase();
        fixtures = fixtures.map(day => {
          const filteredMatches = day.fixtures.filter(fixture => 
            fixture.teamA.includes(searchTerm) || fixture.teamB.includes(searchTerm)
          );
          
          return filteredMatches.length > 0 
            ? { ...day, fixtures: filteredMatches } 
            : null;
        }).filter(Boolean) as FixtureDay[];
      }
      
      return fixtures;
    }
    return [];
  };

  // Check if fixtures are available for the active tab
  const hasFixtures = (): boolean => {
    if (activeTab === "derby") return derbyDay.length > 0;
    if (activeTab === "zim") return zimSablesGames.length > 0;
    if (activeTab === "sa_schools") return saSchoolsRugby.length > 0;
    if (activeTab === "sbr2025") return sbr2025Games.length > 0;
    return false;
  };

  // Get unique months from SBR 2025 fixtures for the dropdown
  const months = ["All", ...Array.from(new Set(sbr2025Games.map(day => day.month)))];
  
  // Get unique months from SA Schools fixtures for the dropdown
  const saMonths = ["All", ...Array.from(new Set(saSchoolsRugby.map(day => day.month)))];
  
  return (
    <div className="relative text-scrummy-navyBlue">
      <div className="relative z-20">
        {/* Logo background overlay */}
        <div
          className="absolute inset-x-0 top-[160px] md:top-[180px] h-[500px] pointer-events-none"
          style={{
            backgroundImage: "url('/assets/logo.png')",
            backgroundSize: "contain",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat"
          }}
        />

        {/* HEADER */}
        <header className="relative py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <Link to="/" className="text-scrummy-navyBlue hover:text-scrummy-goldYellow flex items-center gap-1">
              <ChevronLeft size={20} /> <span>Back to Home</span>
            </Link>
            <motion.h1
              className="mt-8 text-4xl md:text-7xl font-bold text-center mb-16 md:mb-24 font-orbitron relative z-10"
              initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
            >
              <span className="text-scrummy-navyBlue">Schools Rugby</span>
              <span className="block text-scrummy-goldYellow">Fixtures & Results</span>
            </motion.h1>
          </div>
        </header>

        {/* MAIN content */}
        <main className="relative z-10 px-4 md:px-8 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto space-y-4 mt-24">
            {/* Legend for highlighted games */}
            <div className="flex flex-col items-center gap-1 text-scrummy-navyBlue">
              <div className="flex items-center gap-3">
                <img src="/assets/logo.png" alt="SCRUMMY" className="w-12 h-12" />
                <p className="text-base md:text-lg font-orbitron">Below is a schedule of all the Schools Rugby fixtures. Games marked with a<span className="text-scrummy-goldYellow"> yellow border</span> and SCRUMMY logo are ones that will have detailed player and game stats.</p>
              </div>
              <p className="text-sm text-scrummy-navyBlue/70">All times are in CAT (Central Africa Time)</p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mt-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 mx-2 rounded-lg font-bold ${
                    activeTab === tab.key
                      ? "bg-scrummy-goldYellow text-scrummy-navyBlue"
                      : "bg-scrummy-navyBlue text-white hover:bg-scrummy-goldYellow hover:text-scrummy-navyBlue"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Month and Team filters for SBR 2025 */}
            {activeTab === "sbr2025" && (
              <div className="flex justify-end mt-4 gap-2">
                <div className="w-60">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-scrummy-navyBlue/20 text-scrummy-navyBlue font-semibold focus:outline-none focus:ring-2 focus:ring-scrummy-goldYellow"
                    aria-label="Select month"
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month === "All" ? "All Months" : month}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-60">
                  <div className="relative w-full">
                    <input 
                      type="text"
                      value={cbzTeamSearchInput}
                      onChange={(e) => handleCbzTeamSearch(e.target.value)}
                      placeholder="Search for a school..."
                      className="w-full px-3 py-2 rounded-lg bg-white border border-scrummy-navyBlue/20 text-scrummy-navyBlue font-semibold focus:outline-none focus:ring-2 focus:ring-scrummy-goldYellow pr-8"
                      aria-label="Search for a school"
                    />
                    {cbzTeamSearchInput && (
                      <button 
                        onClick={clearCbzTeamSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-scrummy-navyBlue/50 hover:text-scrummy-navyBlue"
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Month and Team filters for SA Schools */}
            {activeTab === "sa_schools" && (
              <div className="flex justify-end mt-4 gap-2">
                <div className="w-60">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-scrummy-navyBlue/20 text-scrummy-navyBlue font-semibold focus:outline-none focus:ring-2 focus:ring-scrummy-goldYellow"
                    aria-label="Select month"
                  >
                    {saMonths.map((month) => (
                      <option key={month} value={month}>
                        {month === "All" ? "All Months" : month}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-60">
                  <div className="relative w-full">
                    <input 
                      type="text"
                      value={teamSearchInput}
                      onChange={(e) => handleTeamSearch(e.target.value)}
                      placeholder="Search for a school..."
                      className="w-full px-3 py-2 rounded-lg bg-white border border-scrummy-navyBlue/20 text-scrummy-navyBlue font-semibold focus:outline-none focus:ring-2 focus:ring-scrummy-goldYellow pr-8"
                      aria-label="Search for a school"
                    />
                    {teamSearchInput && (
                      <button 
                        onClick={clearTeamSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-scrummy-navyBlue/50 hover:text-scrummy-navyBlue"
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-16 space-y-8">
              {!hasFixtures() ? (
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md">
                  <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navyBlue mb-4">
                    Stay Tuned
                  </h2>
                  <p className="text-base text-scrummy-navyBlue/70">
                    Check back soon for updates!
                  </p>
                </div>
              ) : (
                filteredFixtures(activeTab).map((day, idx) => (
                  <div key={idx} className={`bg-white/60 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-md ${day.day === "FEATURED MATCHES" ? "col-span-full" : ""}`}>
                    {day.day === "FEATURED MATCHES" ? (
                      <>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-orbitron border-b border-scrummy-goldYellow pb-4 flex flex-col md:flex-row md:items-end">
                          <span className="text-scrummy-navyBlue">{day.date}</span>
                          <span className="text-scrummy-goldYellow text-2xl md:ml-3">{day.day}</span>
                        </h2>
                        <motion.div
                          className="grid grid-cols-1 gap-4"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {day.fixtures.map((f, i) => (
                            <motion.div key={i} variants={itemVariants} className="w-full">
                              <Card
                                className="transition-all duration-300 hover:shadow-lg h-[280px] w-full relative border-2 border-scrummy-goldYellow hover:shadow-[0_0_20px_rgba(255,199,0,0.4)] cursor-pointer bg-gradient-to-br from-white/90 to-white/70"
                                onClick={() => handleFixtureClick(day.date, f.time, f.teamA, f.teamB)}
                              >
                                <img 
                                  src="/assets/logo.png" 
                                  alt="SCRUMMY" 
                                  className="absolute top-4 right-4 w-12 h-12 opacity-80" 
                                />
                                <CardContent className="p-6 flex flex-col h-full">
                                  <div className="text-xl font-bold text-scrummy-navyBlue bg-scrummy-goldYellow inline-flex rounded-lg px-4 py-2 self-start mb-4">
                                    {f.time}
                                  </div>
                                  <div className="flex items-center justify-center flex-grow gap-8 md:gap-16">
                                    {/* Team A */}
                                    <div className="flex-1 text-center">
                                      {teamLogoMap[f.teamA] && (
                                        <img 
                                          src={teamLogoMap[f.teamA]} 
                                          alt={`${f.teamA} logo`} 
                                          className="w-32 h-32 mx-auto mb-2 object-contain" 
                                        />
                                      )}
                                      <p className="text-xl font-bold text-scrummy-navyBlue">{f.teamA}</p>
                                    </div>
                                    {/* VS */}
                                    <div className="flex-none">
                                      {(() => {
                                        const finalScore = getFinalScore(day.date, f.time, f.teamA, f.teamB);
                                        if (finalScore) {
                                          return (
                                            <p className="text-5xl font-bold text-scrummy-goldYellow font-orbitron">
                                              {String(finalScore.teamAScore).padStart(2, '0')} - {String(finalScore.teamBScore).padStart(2, '0')}
                                            </p>
                                          );
                                        }
                                        return <p className="text-3xl font-bold text-scrummy-goldYellow">VS</p>;
                                      })()}
                                    </div>
                                    {/* Team B */}
                                    <div className="flex-1 text-center">
                                      {teamLogoMap[f.teamB] && (
                                        <img 
                                          src={teamLogoMap[f.teamB]} 
                                          alt={`${f.teamB} logo`} 
                                          className="w-32 h-32 mx-auto mb-2 object-contain" 
                                        />
                                      )}
                                      <p className="text-xl font-bold text-scrummy-navyBlue">{f.teamB}</p>
                                    </div>
                                  </div>
                                  {/* Add streaming link for first match */}
                                  {day.day === "FEATURED MATCHES" && f.time === "11:30" && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                      <a 
                                        href="https://www.facebook.com/stories/103595778471519/UzpfSVNDOjkzMTQzOTcyNTY2OTIxNg==/?view_single=1&source=shared_permalink&mibextid=wwXIfr"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-lg hover:bg-[#0c5bce] transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                        Watch Live on Facebook
                                      </a>
                                    </div>
                                  )}
                                  {/* Add streaming link for Sables match */}
                                  {day.day === "FEATURED MATCHES" && f.time === "14:30" && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                      <a 
                                        href="https://www.facebook.com/share/v/19Ntb1K6s9/?mibextid=wwXIfr"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-lg hover:bg-[#0c5bce] transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                        Watch Live on Facebook
                                      </a>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 flex flex-col md:flex-row md:items-end">
                          <span className="text-scrummy-navyBlue">{day.date}</span>
                          <span className="text-scrummy-goldYellow text-lg md:ml-3">{day.day}</span>
                        </h2>
                        <motion.div
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {day.fixtures.map((f, i) => {
                            const isHighlighted = isHighlightedFixture(day.date, f.time, f.teamA, f.teamB);
                            const isCancelled = isCancelledGame(day.date, f.time, f.teamA, f.teamB);

                            // Get the final score for this fixture
                            let scoreDisplay = null;
                            let showFinal = false;
                            const finalScore = getFinalScore(day.date, f.time, f.teamA, f.teamB);
                            if (finalScore && !isCancelled) {
                              showFinal = true;
                              // Pad scores to two digits for uniformity
                              const teamAStr = String(finalScore.teamAScore).padStart(2, '0');
                              const teamBStr = String(finalScore.teamBScore).padStart(2, '0');
                              scoreDisplay = (
                                <div className="text-2xl font-orbitron text-scrummy-goldYellow text-center">
                                  {teamAStr} - {teamBStr}
                                </div>
                              );
                            }

                            return (
                              <motion.div key={i} variants={itemVariants}>
                                <Card
                                  className={`transition-all duration-300 hover:shadow-lg h-[240px] w-full relative ${
                                    isHighlighted && !isCancelled
                                      ? "border-2 border-scrummy-goldYellow hover:shadow-[0_0_20px_rgba(255,199,0,0.4)] cursor-pointer"
                                      : isCancelled
                                      ? "bg-white/60 opacity-75"
                                      : "bg-white/80 hover:bg-white/90 cursor-pointer"
                                  }`}
                                  onClick={() => !isCancelled && handleFixtureClick(day.date, f.time, f.teamA, f.teamB)}
                                >
                                  {isHighlighted && !isCancelled && (
                                    <img 
                                      src="/assets/logo.png" 
                                      alt="SCRUMMY" 
                                      className="absolute top-2 right-2 w-12 h-12 opacity-80" 
                                    />
                                  )}
                                  <CardContent className="p-2 pt-1 flex flex-col h-full">
                                    <div className={`text-lg font-bold ${
                                      isCancelled 
                                        ? 'text-red-500 bg-red-50'
                                        : isHighlighted 
                                          ? 'text-scrummy-navyBlue bg-scrummy-goldYellow' 
                                          : 'text-scrummy-goldYellow bg-scrummy-navyBlue'
                                    } inline-flex rounded px-2 py-1 self-start mb-0.5 mt-2 ml-2 z-10`}>
                                      {f.time}
                                    </div>

                                    <div className="flex items-center justify-center w-full gap-4 mt-2">
                                      {/* Team A */}
                                      <div className="flex-1 text-center">
                                        {teamLogoMap[f.teamA] && (
                                          <img 
                                            src={teamLogoMap[f.teamA]} 
                                            alt={`${f.teamA} logo`} 
                                            className="w-24 h-24 mx-auto mb-0.5 object-contain" 
                                          />
                                        )}
                                        <p className="text-base font-medium text-scrummy-navyBlue">{f.teamA}</p>
                                      </div>
                                      {/* Score or VS */}
                                      <div className="flex-none flex flex-col items-center justify-center">
                                        {isCancelled ? (
                                          <p className="text-red-500/70 font-semibold text-base">cancelled</p>
                                        ) : showFinal ? (
                                          scoreDisplay
                                        ) : (
                                          <p className="text-scrummy-navyBlue/60 font-semibold text-base">vs</p>
                                        )}
                                      </div>
                                      {/* Team B */}
                                      <div className="flex-1 text-center">
                                        {teamLogoMap[f.teamB] && (
                                          <img 
                                            src={teamLogoMap[f.teamB]} 
                                            alt={`${f.teamB} logo`} 
                                            className="w-24 h-24 mx-auto mb-0.5 object-contain" 
                                          />
                                        )}
                                        <p className="text-base font-medium text-scrummy-navyBlue">{f.teamB}</p>
                                      </div>
                                    </div>

                                    {/* Location display below team info */}
                                    {f.location && (
                                      <div className="text-xs text-center font-medium text-scrummy-navyBlue/70 mt-2">
                                        {f.location}
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="mt-12 text-center text-sm text-scrummy-navyBlue/70">
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Fixtures;
