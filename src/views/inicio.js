import { initChatEngine } from "../engine/chatEngine.js";
import { navigateTo } from "../router/router.js";

export function renderInicio() {
    const app = document.querySelector("#app");

    app.innerHTML = `
        <section class="personaje-selection">

            <p>
                ¡Podrás elegir con quién mantener una conversación!
            </p>

            <p>
                Bienvenidos a Chat Dinámico para que puedas interactuar
                con tu personaje favorito.
            </p>

            <!-- MAGO -->
            <div class="personaje-card">

                <h2 
                    class="personaje-card__title"
                    data-personaje="mago"
                >
                    Eldrin, el Mago Sabio
                </h2>

                <div class="personaje-card__content">
                    <img
                        class="personaje-card__mago"
                        src="./src/css/tarjetaperfil/Eldrin.jpg"
                        alt="Eldrin, el Mago Sabio"
                    >

                    <p class="texto-personaje">
                        Soy Eldrin, un mago sabio y experimentado, con vastos
                        conocimientos en hechicería y magia arcana. Mi misión
                        es guiarte en el mundo de la magia y ayudarte a resolver
                        problemas místicos.
                    </p>
                </div>

            </div>


            <!-- CONSTRUCTOR -->
            <div class="personaje-card">

                <h2 
                    class="personaje-card__title"
                    data-personaje="constructor"
                >
                    Don Cacho, el Constructor
                </h2>

                <div class="personaje-card__content">
                    <img
                        class="personaje-card__constructor"
                        src="./src/css/tarjetaperfil/Don Cacho.jpg"
                        alt="Don Cacho, el Constructor"
                    >

                    <p class="texto-personaje">
                        Soy Don Cacho, un maestro mayor de obra y constructor
                        con más de treinta años de experiencia levantando casas
                        desde los cimientos. Tu misión es dar consejos prácticos
                        de construcción y ayudar con cálculos de materiales.
                    </p>
                </div>

            </div>


            <!-- CHEF -->
            <div class="personaje-card">

                <h2 
                    class="personaje-card__title"
                    data-personaje="chef"
                >
                    Luigi Corelli, el Chef
                </h2>

                <div class="personaje-card__content">
                    <img
                        class="personaje-card__chef"
                        src="./src/css/tarjetaperfil/Luigi.jpg"
                        alt="Luigi Corelli"
                    >

                    <p class="texto-personaje">
                        Soy Luigi Corelli, un chef ejecutivo italiano de alta
                        cocina, apasionado por las recetas tradicionales,
                        el respeto por los ingredientes y los tiempos de
                        cocción perfectos.
                    </p>
                </div>

            </div>

            <p>
                <a href="/nosotros" class="nosotros__link">
                    Conoce a nuestro equipo
                </a>
            </p>

        </section>
    `;

    initChatEngine(); // Inicializa el motor de chat para que detecte los clicks en los personajes
    
}