import { defineConfig } from 'vite'; // Importa la funzione per definire la configurazione di Vite, quindi i plugin necessari e esporta la configurazione
import laravel from 'laravel-vite-plugin'; // Plugin per integrare Vite con Laravel perchè Vite non supporta nativamente Laravel quindi serve questo plugin
import react from '@vitejs/plugin-react'; // Plugin per supportare React in Vite perchè è necessario per gestire JSX e altre funzionalità di React

export default defineConfig({ // Questo è il file di configurazione di Vite per un progetto Laravel con React
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
});
