// SVGs encodés proprement en Base64 pour compatibilité Safari / iOS
const IG_SVG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBmaWxsPSIjRTEzMDZDIiBkPSJNMjI0LjEgMTQxLjFjLTQzLjYgMC03OC44IDM1LjMtNzguOCA3OC45czM1LjIgNzguOSA3OC44IDc4LjkgNzguOC0zNS4zIDc8LjgtNzguOS0zNS4yLTc4LjktNzguOC03OC45em0wIDEyOS43Yy0yOCAwLTUwLjgtMjIuOC01MC44LTUwLjhzMjIuOC01MC44IDUwLjgtNTAuOCA1MC44IDIyLjggNTAuOCA1MC44YzAgMjgtMjIuOCA1MC44LTUwLjggNTAuOHptMTIwLTEzNy41YzAgMTAuMS04LjIgMTguMy0xOC4zIDE4LjMtMTAuMSAwLTE4LjMtOC4yLTE4LjMtMTguMyAwLTEwLjEgOC4yLTE4LjMgMTguMy0xOC4zIDEwLjEgMCAxOC4zIDguMiAxOC4zIDE4LjN6bTU3LjEgMTguM2MtMS41LTMyLjMtOC45LTYwLjgtMzIuNi04NC41LTIzLTIzLjc1Mi4yLTMxLjEtODQuNS0zMi42LTMzLjMtMS45LTEzMy4zLTEuOS0xNjYuNiAwLTMyLjMgMS41LTYwLjggOC45LTg0LjUgMzIuNi0yMy43IDIzLjctMzEuMSA1Mi4yLTMyLjYgODQuNS0xLjkgMzMuMy0xLjkgMTMzLjMgMCAxNjYuNiAxLjUgMzIuMyA4LjkgNjAuOCAzMi42IDg0LjUgMjMuNyAyMy43IDUyLjIgMzEuMSA4NC41IDMyLjYgMzMuMyAxLjkgMTMzLjMgMS45IDE2Ni42IDAgMzIuMy0xLjUgNjAuOC04LjkgODQuNS0zMi42IDIzLjctMjMuNyAzMS4xLTUyLjIgMzIuNi04NC41IDEuOS0zMy4zIDEuOS0xMzMuMyAwLTE2Ni42em0tNDUuOSAxOTZjLTcgMTcuNy0yMC43IDMxLjMtMzguNCAzOC40LTI4LjMgMTEuMi05NS42IDguNi0xMjYuOCA4LjZzLTk4LjYgMi41LTEyNi44LTguNmMtMTcuNy03LTMxLjMtMjAuNy0zOC40LTM4LjQtMTEuMi0yOC4zLTguNi05NS42LTguNi0xMjYuOHMtMi41LTk4LjYgMTEuMi0xMjYuOGM3LTE3LjcgMjAuNy0zMS4zIDM4LjQtMzguNCAyOC4zLTExLjIgOTUuNi04LjYgMTI2LjgtOC42czk4LjYtMi41IDEyNi44IDguNmMxNy43IDcgMzEuMyAyMC43IDM4LjQgMzguNCAxMS4yIDI4LjMgOC42IDk1LjYgOC42IDEyNi44czIuNSA5OC42LTExLjIgMTI2Ljh6Ii8+PC9zdmc+";
const WA_SVG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBmaWxsPSIjMjVEMzY2IiBkPSJNMzgwLjkgOTcuMUMzMzkgNTUuMSAyODMuMiAzMiAyMjMuOSAzMmMtMTIyLjQgMC0yMjIgOTkuNi0yMjIgMjIyIDAgMzkuMSAxMC4yIDc3LjMgMjkuNiAxMDFMMCA0ODBMMTE3LjctMzAuOWMzMi40IDE3LjcgNjguOSAyNyAxMDYuMSAyN2guMWMxMjIuMyAwIDIyNC4xLTk5LjYgMjI0LjEtMjIyIDAtNTkuMy0yNS4yLTExNS02Ny4xLTE1N3ptLTE1NyAzNDEuNmMtMzMuMiAwLTY1LjctOC45LTk0LTI1LjdsLTYuNy00LTY5LjggMTguMyAxOC42LTY4LjEtNC40LTdjLTE4LjUtMjkuNC0yOC4yLTYzLjMtMjguMi05OC4yIDAtMTAxLjcgODIuOC0xODQuNSAxODQuNi0xODQuNSA0OS4zIDAgOTUuNiAxOS4yIDEzMC40IDU0LjEgMzQuOCAzNC45IDU2LjIgODEuMiA1Ni4xIDEzMC41IDAgMTAxLjgtODQuOSAxODQuNi0xODYuNiAxODQuNnptMTAxLjItMTM4LjJjLTU4LTIuOC0zMi44LTE2LjItMzcuOS0xOC01LjEtMS45LTguOC0yLjgtMTIuNSAyLjgtMy43IDUuNi0xNC4zIDE4LTE3LjYgMjEuOC0zLjIgMy43LTYuNSA0LjItMTIgMS40LTMyLjYtMTYuMy01NC0yOS4xLTc1LjUtNjYtNS43LTkuOCA1LjctOS4xIDE2LjMtMzAuMyAxLjgtMy43LjktNi45LS41LTkuNy0xLjQtMi44LTEyLjUtMzAuMS0xNy4xLTQxLjItNC41LTEwLjgtOS4xLTkuMy0xMi41LTkuNS0zLjItLjItNi45LS4yLTEwLjYtLjItMy43IDAtOS43IDEuNC0xNC44IDYuOS01LjEgNS42LTE5LjQgMTktMTkuNCA0Ni4zIDAgMjcuMyAxOS45IDUzLjcgMjIuNiA1Ny40IDIuOCAzLjcgMzkuMSA1OS43IDk0LjggODMuOCAzNS4yIDE1LjIgNDkgMTYuNSA2Ni42IDEzLjkgMTAuNy0xLjYgMzIuOC0xMy40IDM3LjQtMjYuNCA0LjYtMTMgNC42LTI0LjEgMy4yLTI2LjQtMS4zLTIuNS01LTMuOS0xMC41LTYuNnoiLz48L3N2Zz4=";
const FB_SVG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjMTg3N0YyIiBkPSJNNTA0IDI1NkBDNTA0IDExOS41IDM5My41IDggMjU2IDggUzggMTE5LjUgOCAyNTZjMCAxMjAuNyA4Ni4yIDIyMS40IDIwMSAyNDFWMzI1LjFoLTU3VjI1Nmg1N3YtNjhjMC01Ni4zIDMzLjUtODcgODQuMy04NyAyNC4zIDAgNDkuNiA0LjQgNDkuNiA0LjR2NTRoLTI3LjhjLTI3LjkgMC0zNi42IDE3LjMtMzYuNiAzNS4xVjI1Nmg2MWwtOS44IDY5LjFoLTUxLjJWMjk3QzQxNy44IDQ3Ny40IDUwNCAzNzYuNyA1MDQgMjU2eiIvPjwvc3ZnPg==";
const YT_SVG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTEyIj48cGF0aCBmaWxsPSIjRkYwMDAwIiBkPSJNNTQ5LjY1NSAxMjQuMDg2Yy02LjI4MS0yMy42NS0yNC43OTktNDIuMTY3LTQ4LjQ0OS00OC40NDlDMDU4LjkxOCA2NCAyODggNjQgMjg4IDY0czIyOC45MTggMCAyMDkuMTA2IDExLjYzN2MyMy42NSA2LjI4MiA0Mi4xNjcgMjQuNzk5IDQ4LjQ0OSA0OC40NDlDNTc2IDE0NC45MTggNTc2IDI1NiA1NzYgMjU2cy0uOTE4IDExMS4wODItMTEuMzQ1IDEzMS45MTRjLTYuMjgyIDIzLjY1LTI0Ljc5OSA0Mi4xNjctNDguNDQ5IDQ4LjQ0OUM1MTYuOTE4IDQ0OCAyODggNDQ4IDI4OCA0NDhzLTIyOC45MTggMC0yMDkuMTA2LTExLjYzN2MtMjMuNjUtNi4yODItNDIuMTY3LTI0Ljc5OS00OC40NDktNDguNDQ5QzAgMzY3LjA4MiAwIDI1NiAwIDI1NnMuOTE4LTExMS4wODIgMTEuMzQ1LTEzMS45MTR6TTIzMCAzMzhsMTQyLTgyLTE0Mi04MnYzNjR6Ii8+PC9zdmc+";

export const TEMPLATES = [
  {
    id: 'instagram-classic',
    title: 'Instagram',
    type: 'url',
    data: 'https://instagram.com',
    image: IG_SVG,
    dotsOptions: { color: '#833AB4', type: 'rounded' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { color: '#E1306C', type: 'extra-rounded' },
    cornersDotOptions: { color: '#FD1D1D' },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.35, margin: 4 }
  },
  {
    id: 'whatsapp-green',
    title: 'WhatsApp',
    type: 'url',
    data: 'https://wa.me/',
    image: WA_SVG,
    dotsOptions: { color: '#25D366', type: 'dots' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { color: '#128C7E', type: 'dot' },
    cornersDotOptions: { color: '#075E54' },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.35, margin: 4 }
  },
  {
    id: 'facebook-blue',
    title: 'Facebook',
    type: 'url',
    data: 'https://facebook.com',
    image: FB_SVG,
    dotsOptions: { color: '#1877F2', type: 'rounded' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { color: '#0F52BA', type: 'square' },
    cornersDotOptions: { color: '#1877F2' },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.35, margin: 4 }
  },
  {
    id: 'youtube-red',
    title: 'YouTube',
    type: 'url',
    data: 'https://youtube.com',
    image: YT_SVG,
    dotsOptions: { color: '#FF0000', type: 'rounded' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { color: '#CC0000', type: 'square' },
    cornersDotOptions: { color: '#FF0000' },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.35, margin: 4 }
  },
  {
    id: 'tiktok-dark',
    title: 'TikTok',
    type: 'url',
    data: 'https://tiktok.com',
    dotsOptions: { color: '#00F2FE', type: 'classy-rounded' },
    backgroundOptions: { color: '#000000' },
    cornersSquareOptions: { color: '#FF0050', type: 'extra-rounded' },
    cornersDotOptions: { color: '#00F2FE' }
  },
  {
    id: 'wifi-blue',
    title: 'Wi-Fi Direct',
    type: 'wifi',
    data: 'WIFI:S:MonReseau;T:WPA;P:motdepasse;;',
    dotsOptions: { color: '#007AFF', type: 'classy' },
    backgroundOptions: { color: '#f8fafc' },
    cornersSquareOptions: { color: '#004080', type: 'extra-rounded' },
    cornersDotOptions: { color: '#007AFF' }
  },
  {
    id: 'linkedin-business',
    title: 'LinkedIn Pro',
    type: 'url',
    data: 'https://linkedin.com',
    dotsOptions: { color: '#0A66C2', type: 'square' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { color: '#004182', type: 'square' },
    cornersDotOptions: { color: '#0A66C2' }
  },
  {
    id: 'twitter-x',
    title: 'X / Twitter',
    type: 'url',
    data: 'https://x.com',
    dotsOptions: { color: '#000000', type: 'dots' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { color: '#000000', type: 'dot' },
    cornersDotOptions: { color: '#000000' }
  },
  {
    id: 'website-globe',
    title: 'Site Web',
    type: 'url',
    data: 'https://google.com',
    dotsOptions: { color: '#4F46E5', type: 'rounded' },
    backgroundOptions: { color: '#EEF2FF' },
    cornersSquareOptions: { color: '#3730A3', type: 'extra-rounded' },
    cornersDotOptions: { color: '#4F46E5' }
  },
  {
    id: 'email-envelope',
    title: 'Email Direct',
    type: 'email',
    data: 'mailto:contact@exemple.com',
    dotsOptions: { color: '#EA4335', type: 'classy-rounded' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { color: '#B31412', type: 'extra-rounded' },
    cornersDotOptions: { color: '#EA4335' }
  },
  {
    id: 'snapchat-yellow',
    title: 'Snapchat',
    type: 'url',
    data: 'https://snapchat.com',
    dotsOptions: { color: '#000000', type: 'dots' },
    backgroundOptions: { color: '#FFFC00' },
    cornersSquareOptions: { color: '#000000', type: 'square' },
    cornersDotOptions: { color: '#000000' }
  },
  {
    id: 'spotify-music',
    title: 'Spotify Musique',
    type: 'url',
    data: 'https://spotify.com',
    dotsOptions: { color: '#1DB954', type: 'rounded' },
    backgroundOptions: { color: '#121212' },
    cornersSquareOptions: { color: '#1DB954', type: 'extra-rounded' },
    cornersDotOptions: { color: '#1DB954' }
  }
];
