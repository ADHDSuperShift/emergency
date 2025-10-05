# Emergency Contacts App

A comprehensive emergency services directory for South African provinces, providing quick access to essential contact information including police, fire services, medical emergency services, and local emergency numbers.

## Features

- 🏥 **Comprehensive Emergency Services**: Police, Fire, Medical, and local emergency contacts
- 🗺️ **Province-Based Directory**: Organized by South African provinces (Gauteng, Western Cape, Eastern Cape, KwaZulu-Natal, Limpopo)
- 🏘️ **Town-Specific Contacts**: Detailed emergency contacts for towns within each province
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, accessible interface built with shadcn/ui components
- ⚡ **Fast Performance**: Built with Vite for optimal loading speeds

## Technology Stack

- **Frontend**: React 18 with JSX
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React
- **Deployment**: Vercel & GitHub Pages
- **Data**: JSON-based emergency contacts database

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 10+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ADHDSuperShift/emergency.git
cd emergency
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── AppLayout.jsx          # Main application layout
│   ├── EmergencyCard.jsx      # Emergency service card component
│   └── ui/                    # shadcn/ui components (buttons, cards, etc.)
├── contexts/
│   └── AppContext.jsx         # Application state management
├── pages/
│   ├── Index.jsx             # Home page
│   └── NotFound.jsx          # 404 error page
└── lib/
    └── utils.ts              # Utility functions

public/
├── data/                     # Emergency contacts JSON files
│   ├── gauteng.json
│   ├── western-cape.json
│   ├── eastern-cape.json
│   ├── kwazulu-natal.json
│   └── limpopo.json
└── sdb.jpg                   # Logo image
```

## Data Structure

Emergency contacts are organized by province and town:

```json
{
  "province": "Gauteng",
  "towns": [
    {
      "name": "Johannesburg",
      "services": [
        {
          "name": "SAPS Johannesburg Central",
          "type": "Police",
          "phone": "011-123-4567",
          "address": "123 Main Street, Johannesburg"
        }
      ]
    }
  ]
}
```

## Deployment

### Vercel (Recommended)

The app is configured for easy deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite framework
3. Deploy with default settings

Live URL: [Your Vercel deployment URL]

### GitHub Pages

The repository includes a GitHub Actions workflow for automatic deployment:

1. Push to the `main` branch
2. GitHub Actions will build and deploy to GitHub Pages
3. Access at: https://adhdsupershift.github.io/emergency

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Adding New Emergency Contacts

To add emergency contacts for a new province or update existing ones:

1. Navigate to `public/data/`
2. Edit the appropriate province JSON file or create a new one
3. Follow the existing data structure
4. Test locally before submitting a PR

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue on GitHub or contact the maintainers.

---

**Emergency Disclaimer**: This app provides emergency contact information for reference purposes. In a real emergency, always call your local emergency number (10111 for police, 10177 for medical emergencies in South Africa) or the universal emergency number 112.
