const events = [
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Hackathon 2026",
    title: "48-Hour Coding Challenge",
    description: "Join developers, designers, and innovators to build impactful solutions within 48 hours.",
    imageUrl: "https://picsum.photos/id/180/800/500",
    Location: "NIT Raipur Auditorium",
    eventDate: "2026-07-15",
    eventTime: "09:00 AM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Web Dev Bootcamp",
    title: "Modern MERN Stack Workshop",
    description: "Hands-on workshop covering React, Node.js, Express, and MongoDB.",
    imageUrl: "https://picsum.photos/id/201/800/500",
    Location: "Computer Center",
    eventDate: "2026-07-20",
    eventTime: "10:00 AM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "AI Summit",
    title: "Future of Artificial Intelligence",
    description: "Industry experts discuss emerging trends in AI and machine learning.",
    imageUrl: "https://picsum.photos/id/250/800/500",
    Location: "Main Seminar Hall",
    eventDate: "2026-08-01",
    eventTime: "11:00 AM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Startup Meetup",
    title: "Entrepreneurship Networking Session",
    description: "Meet startup founders and investors to discuss innovative ideas.",
    imageUrl: "https://picsum.photos/id/292/800/500",
    Location: "Innovation Hub",
    eventDate: "2026-08-05",
    eventTime: "04:00 PM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Cyber Security Workshop",
    title: "Ethical Hacking Essentials",
    description: "Learn security fundamentals and defensive cybersecurity practices.",
    imageUrl: "https://picsum.photos/id/325/800/500",
    Location: "Lab 3",
    eventDate: "2026-08-10",
    eventTime: "02:00 PM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Tech Fest",
    title: "Annual Technology Festival",
    description: "A celebration of innovation featuring competitions, exhibitions, and talks.",
    imageUrl: "https://picsum.photos/id/342/800/500",
    Location: "Campus Ground",
    eventDate: "2026-08-18",
    eventTime: "09:30 AM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Photography Walk",
    title: "Capture the Campus",
    description: "Explore photography techniques while capturing beautiful moments.",
    imageUrl: "https://picsum.photos/id/433/800/500",
    Location: "Central Park",
    eventDate: "2026-08-22",
    eventTime: "06:00 AM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Coding Contest",
    title: "Competitive Programming Battle",
    description: "Test your problem-solving skills against top coders.",
    imageUrl: "https://picsum.photos/id/445/800/500",
    Location: "Computer Lab",
    eventDate: "2026-08-25",
    eventTime: "06:00 PM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Data Science Seminar",
    title: "Data Driven Decision Making",
    description: "Discover how organizations use data analytics to drive growth.",
    imageUrl: "https://picsum.photos/id/486/800/500",
    Location: "Seminar Hall B",
    eventDate: "2026-09-01",
    eventTime: "11:30 AM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Open Source Day",
    title: "Contribute to Open Source",
    description: "Learn Git, GitHub, and contribute to real-world projects.",
    imageUrl: "https://picsum.photos/id/501/800/500",
    Location: "Innovation Lab",
    eventDate: "2026-09-05",
    eventTime: "01:00 PM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Robotics Expo",
    title: "Future Robotics Showcase",
    description: "Witness innovative robotics projects developed by students.",
    imageUrl: "https://picsum.photos/id/550/800/500",
    Location: "Mechanical Block",
    eventDate: "2026-09-10",
    eventTime: "10:00 AM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Cloud Computing Workshop",
    title: "Deploy Applications on Cloud",
    description: "Learn cloud deployment and infrastructure basics.",
    imageUrl: "https://picsum.photos/id/601/800/500",
    Location: "IT Lab",
    eventDate: "2026-09-15",
    eventTime: "03:00 PM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "UI UX Design Session",
    title: "Design Better Experiences",
    description: "Explore modern UI/UX principles and practical design tools.",
    imageUrl: "https://picsum.photos/id/620/800/500",
    Location: "Design Studio",
    eventDate: "2026-09-18",
    eventTime: "11:00 AM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Career Guidance Talk",
    title: "Building a Successful Tech Career",
    description: "Industry professionals share career growth strategies.",
    imageUrl: "https://picsum.photos/id/640/800/500",
    Location: "Auditorium",
    eventDate: "2026-09-22",
    eventTime: "05:00 PM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Blockchain Meetup",
    title: "Beyond Cryptocurrency",
    description: "Understand blockchain applications across industries.",
    imageUrl: "https://picsum.photos/id/680/800/500",
    Location: "Conference Hall",
    eventDate: "2026-09-28",
    eventTime: "04:00 PM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Gaming Tournament",
    title: "Campus Esports Championship",
    description: "Compete with the best gamers and win exciting prizes.",
    imageUrl: "https://picsum.photos/id/700/800/500",
    Location: "Student Activity Center",
    eventDate: "2026-10-02",
    eventTime: "07:00 PM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Leadership Summit",
    title: "Develop Leadership Skills",
    description: "Interactive sessions on teamwork and leadership.",
    imageUrl: "https://picsum.photos/id/720/800/500",
    Location: "Seminar Hall A",
    eventDate: "2026-10-08",
    eventTime: "10:00 AM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Research Symposium",
    title: "Innovations in Engineering",
    description: "Students present cutting-edge research projects.",
    imageUrl: "https://picsum.photos/id/740/800/500",
    Location: "Research Center",
    eventDate: "2026-10-12",
    eventTime: "09:00 AM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Cultural Evening",
    title: "Music and Dance Celebration",
    description: "An evening filled with performances and entertainment.",
    imageUrl: "https://picsum.photos/id/760/800/500",
    Location: "Open Air Theatre",
    eventDate: "2026-10-18",
    eventTime: "06:30 PM"
  },
  {    
    owner:'6a3d2a773e004da6d632cdac',
    eventName: "Alumni Connect",
    title: "Meet Successful Alumni",
    description: "Interact with alumni and learn from their experiences.",
    imageUrl: "https://picsum.photos/id/780/800/500",
    Location: "Conference Center",
    eventDate: "2026-10-25",
    eventTime: "04:30 PM"
  }
];

module.exports = events;