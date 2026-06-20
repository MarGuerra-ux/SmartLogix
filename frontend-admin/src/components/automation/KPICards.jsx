import "./KPICards.css";

function KPICards({

    dashboard,

    moduleStats,

    running

}){

    const cards=[

        {

            title:"Operaciones",

            value:dashboard.total,

            icon:"📦"

        },

        {

            title:"Entregados",

            value:dashboard.delivered,

            icon:"✅"

        },

        {

            title:"En Tránsito",

            value:dashboard.transit,

            icon:"🚚"

        },

        {

            title:"Pendientes",

            value:dashboard.pending,

            icon:"🕒"

        },

        {

            title:"Incidencias",

            value:dashboard.incidents,

            icon:"⚠️"

        }

    ];

    return(

        <section className="kpi-grid">

            {

                cards.map(card=>(

                    <article

                        key={card.title}

                        className="kpi-card"

                    >

                        <div className="kpi-icon">

                            {card.icon}

                        </div>

                        <div className="kpi-info">

                            <span>

                                {card.title}

                            </span>

                            <strong>

                                {card.value}

                            </strong>

                        </div>

                    </article>

                ))

            }

            <article

                className={`system-status ${

                    running

                    ? "running"

                    : ""

                }`}

            >

                <span>

                    Estado del Motor

                </span>

                <strong>

                    {

                        running

                        ? "🟢 Ejecutándose"

                        : "⚪ En espera"

                    }

                </strong>

            </article>

        </section>

    );

}

export default KPICards;