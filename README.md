# Virtual Art Gallery VR

A WebXR-based virtual art gallery that allows users to view full-size artwork in virtual or augmented reality.

Try it out: [**Live Demo**](https://mr.strehk.eu)

## Project Goals

- Create an accessible virtual art gallery experience
- Support both VR and AR viewing modes
- Present artwork with proper size, lighting and spatial context
- Provide artwork information in an immersive way

## Features

- Immersive 3D gallery environment
- Dynamic room sizing based on artwork dimensions
- Optimal viewing distances and heights
- Artwork information display (title and medium)

## Technologies Used

### Core Framework
- [**Svelte** and **SvelteKit**](https://svelte.dev/) - Feature rich Javascript/UI framework, with server-side rendering
- **TypeScript** - Type-safe JavaScript

### API Integration and Data Sources
- [**Artsy API**](https://developers.artsy.net/) - Artwork and artist information

### 3D and VR Libraries
- [**threlte**](https://threlte.xyz/) – A [Three.js](https://threejs.org/)-Wrapper for Svelte applications
  - **@threlte/core** - Svelte components for Three.js
  - **@threlte/extras** - Additional Threlte utilities
  - **@threlte/xr** - Effortless WebXR support for Threlte

### Development Tools
- **Vite** - Build tool and development server
- **WebXR** - Web-based VR/AR experiences

## Getting Started

1. Install dependencies:
```bash
npm install

3. Create a `.env` file in the root directory with the following content:
```bash
ARTSY_API_URL=https://api.artsy.net
ARTSY_API_CLIENT_ID=***YOUR_CLIENT_ID***
ARTSY_API_CLIENT_SECRET=***YOUR_CLIENT_SECRET***
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Usage

Browse the gallery in your HMD's browser and select an artwork. Start the VR or AR experience to view the artwork in full size.

## Known Issues

The Artsy API is pretty limited in terms of public domain artworks, wich results in a limited selection of artworks to display. On search, the gallery is currently showing all artworks in the database nontheless, which makes it frustrating to find artworks that are actually available to view. Best experience is to not search at all and just browse the default selection.

## Deployment with Docker

A Production-ready Image is available on GHCR:
```bash
docker pull ghcr.io/strehk/uni-mixed-reality-freestyle:latest
```

To run the image, you need to provide the Artsy API credentilas as environment variables as well as open the port 3000:
```bash
docker run -d \
  -e ARTSY_API_URL=https://api.artsy.net \
  -e ARTSY_API_CLIENT_ID=replaceme \
  -e ARTSY_API_CLIENT_SECRET=replaceme \
  -p 3000:3000 \
  ghcr.io/strehk/uni-mixed-reality-freestyle:nightly \
```

The equivalent `docker-compose.yml` file would look like this:
```yaml
services:
  mixed-reality-freestyle:
    image: ghcr.io/strehk/uni-mixed-reality-freestyle:latest
    environment:
      - ARTSY_API_URL=https://api.artsy.net
      - ARTSY_API_CLIENT_ID=replaceme
      - ARTSY_API_CLIENT_SECRET=replaceme
    ports:
      - 3000:3000
```