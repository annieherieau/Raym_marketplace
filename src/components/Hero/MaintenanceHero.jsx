import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import '../../index.css'; // Assurez-vous d'importer votre fichier CSS global si nécessaire

const MaintenanceHero = () => {
    return (
        <>
            <div className="relative bg-custom-image">
                <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
                <div className="px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl pb-10">
                            <FontAwesomeIcon icon={faScrewdriverWrench} /> MAINTENANCE
                        </h1>
                        <h3 className="text-4xl text-white">Quelques conseils pour garder un vélo en parfait état.</h3>
                        <p className="mt-4 text-2xl text-white leading-8">Il est avéré qu'un vélo RAYM peut s'apparenter à un vrai cheval de course. Fiable, solide et fun à rouler. Mais même un pur-sang a besoin de l'attention nécessaire pour délivrer ses meilleures performances. Voici quelques consignes pour tirer le meilleur de votre monture. Gardez à l'esprit que des conditions météo difficiles et une utilisation intensive demanderont un entretien plus régulier.</p>
                    </div>
                </div>
            </div>

            <section className="text-2xl text-gray-900 body-font">
                <div className="container px-5 py-24 mx-auto">
                    {/* Premier bloc de conseils */}
                    <div className="flex flex-col items-center pb-10 mx-auto mb-10 border-b border-gray-200 lg:w-3/5 sm:flex-row">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-64 h-64 text-brown-500 rounded-full sm:w-72 sm:h-72 sm:mr-10">
                            <img src="src/assets/repair4.jpg" alt="" className="w-full h-full object-cover rounded-full"/>
                        </div>
                        <div className="flex-grow mt-6 text-center sm:text-left sm:mt-0">
                            <h2 className="mb-2 text-3xl font-medium title-font">CHAQUE SORTIE</h2>
                            <ul className="text-2xl text-gray-900">
                                <li className="p-2"><strong>1. Vérifiez la pression des pneus et l'état des roues</strong> - Vérifiez que les pneus soient gonflés à la pression désirée, avec une pompe ou un manomètre. Faites tourner la roue pour repérer l'usure et d'éventuels dégâts. En même temps, vérifiez aussi que la roue ne soit pas voilée, que les moyeux n'aient pas de jeu et que les disques ne touchent pas.</li>
                                <li className="p-2"><strong>2. Vérifiez la chaîne</strong> - Assurez-vous que votre chaîne est correctement branchée. Vous devriez aussi essuyer votre chaîne à chaque sortie.</li>
                                <li className="p-2"><strong>3. Nettoyez les plongeurs de la fourche, de l'amortisseur et de la tige de selle.</strong></li>
                                <li className="p-2"><strong>4. Vérifiez le serrage de vos axes</strong> - Assurez-vous que vos axes avant et arrière soient correctement installés et serrés.</li>
                                <li className="p-2"><strong>5. Donnez un peu d'amour à votre cadre</strong> - En gardant vos suspensions et votre transmission entretenues et lubrifiées comme décrit au-dessus, vous vous assurez d'avoir un vélo qui fonctionne, mais bien qu'avoir un cadre sale n'affecte pas les performances, un vélo propre est un vélo entretenu. Un petit coup d'éponge ou de chiffon après chaque sortie assurera que tout soit toujours nickel.</li>
                                <li className="p-2"><strong>6. Chargez votre batterie</strong> - Il n'y a rien de plus frustrant que de se préparer pour une sortie et réaliser que la batterie est faible. Chargez votre batterie après chaque sortie en suivant les recommandations du constructeur et restez prêt à partir à tout moment.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Deuxième bloc de conseils */}
                    <div className="flex flex-col items-center pb-10 mx-auto mb-10 border-b border-gray-200 lg:w-3/5 sm:flex-row">
                        <div className="flex-grow mt-6 text-center sm:text-left sm:mt-0">
                            <h2 className="mb-2 text-3xl font-medium title-font">TOUTES LES 3 À 5 SORTIES</h2>
                            <ul className="text-2xl text-gray-900">
                                <li className="p-2"><strong>1. Vérifier la pression de la fourche et de l'amortisseur</strong> - Au cours du temps, les suspensions ont tendance à perdre un peu d'air. Utilisez une pompe haute pression pour vérifier que votre fourche et votre amortisseur gardent la pression adaptée. Si vous avez besoin d'aide pour régler vos suspensions, reportez-vous à notre guide.</li>
                                <li className="p-2"><strong>2. Vérifier l'état d'usure des plaquettes</strong> - Vérifiez le niveau des plaquettes de frein en regardant à travers l'étrier devant un fond clair ou une feuille de papier. Les conditions humides et une utilisation régulière en descente accélèrent l'usure, soyez donc plus vigilant dans ces conditions. Utilisez de l'alcool ménager pour nettoyer vos freins et repérez toutes fuites d'huile éventuelles.</li>
                                <li className="p-2"><strong>3. Contrôler les serrages</strong> - Une vis desserrée peut vite créer des problèmes et une situation dangereuse. Faites une vérification complète de toutes les vis en partant de l'avant vers l'arrière et assurez-vous que tout soit bien serré au bon couple de serrage.</li>
                                <li className="p-2"><strong>4. Vérifier l'état de batterie des composants AXS</strong> - Si vous êtes équipé de composants électroniques SRAM AXS (dérailleur et/ou tige de selle télescopique), vérifiez que ces composants soient bien chargés en utilisant l'App ou en appuyant simplement sur le bouton du composant en question qui vous donnera l'état de batterie.</li>
                                <li className="p-2"><strong>5. Donnez un peu d'amour à votre cadre</strong> - En gardant vos suspensions et votre transmission entretenues et lubrifiées comme décrit au-dessus, vous vous assurez d'avoir un vélo qui fonctionne, mais bien qu'avoir un cadre sale n'affecte pas les performances, un vélo propre est un vélo entretenu. Un petit coup d'éponge ou de chiffon après chaque sortie assurera que tout soit toujours nickel.</li>
                                <li className="p-2"><strong>6. Nettoyez les capteurs</strong> - De la terre et de la poussière peuvent s'installer sur les capteurs de votre vélo électrique et créer des codes d'erreurs. Essuyez régulièrement les capteurs pour assurer un fonctionnement optimal. Si un code erreur apparaît sur votre ebike, commencez par essayer cette solution.</li>
                                <li className="p-2"><strong>Spécificités ebike</strong></li>
                            </ul>
                            <a href="https://www.sram.com/en/learn/tech-deep-dives/red/axs-controls" className="inline-flex items-center mt-3 text-indigo-500">VOIR LE GUIDE SRAM AXS ICI
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-64 h-64 text-brown-500 rounded-full sm:w-72 sm:h-72 sm:mr-10">
                            <img src="src/assets/repair2.webp" alt="" className="w-full h-full object-cover rounded-full"/>
                        </div>
                    </div>

                    {/* Troisième bloc de conseils */}
                    <div className="flex flex-col items-center pb-10 mx-auto mb-10 border-b border-gray-200 lg:w-3/5 sm:flex-row">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-64 h-64 text-brown-500 rounded-full sm:w-72 sm:h-72 sm:mr-10">
                            <img src="src/assets/repair3.webp" alt="Repair Image 3" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="flex-grow mt-6 text-center sm:text-left sm:mt-0">
                            <h2 className="mb-2 text-3xl font-medium title-font">TOUS LES 3 À 6 MOIS</h2>
                            <p>Nombreux de ces points requièrent des outils spécifiques et un certain savoir-faire. Envisagez d'apporter votre vélo chez un revendeur Santa Cruz pour effectuer certains de ces services.</p>
                            <ul className="text-2xl text-gray-900">
                                <li className="p-2"><strong>1. Entretien des jambages de fourche</strong> - Changez les joins et l'huile de lubrification. Consultez les conseils d'entretien du constructeur pour avoir des instructions spécifiques, les intervalles entre les services et les volumes d'huile.</li>
                                <li className="p-2"><strong>2. Entretien des freins à disques hydrauliques</strong> - Nettoyez et purgez vos freins en changeant l'huile. Contrôlez l'usure de vos plaquettes et disques.</li>
                                <li className="p-2"><strong>3. Entretien de la tige de selle télescopique</strong> - Tout comme les suspensions, les tiges de selle télescopiques demandent un entretien régulier. Consultez les indications du constructeur pour connaître les exigences d'entretien.</li>
                                <li className="p-2"><strong>4. Nettoyage en profondeur de la transmission</strong> - Nettoyez la chaîne, mais aussi la cassette, les roulettes de dérailleur et le plateau. Nettoyez également le corps de roue-libre.</li>
                                <li className="p-2"><strong>5. Inspectez les pneus pour vérifier l'usure et le niveau de préventif</strong> - Vérifiez l'état d'usure de vos pneus et changez-les si besoin. Vérifiez le niveau de préventif, en ajouter si besoin. Si vous habitez dans une région sèche, envisagez de remplacer l'ensemble du préventif dans ce laps de temps.</li>
                                <li className="p-2"><strong>6. Vérifier l'usure et la tension de la chaîne</strong> - Une chaîne excessivement usée peut réduire la durée de vie des composants d'une transmission onéreuse comme la cassette et le plateau. Utilisez un outil de mesure de chaîne pour vérifier l'usure et la remplacer si besoin.</li>
                                <li className="p-2"><strong>7. Nettoyer les contacts</strong> - Retirez la batterie de votre vélo (si possible) et utilisez un spray de nettoyage spécifique pour les connectiques. Essuyez pour nettoyer.</li>
                            </ul>
                            <p className="mt-4 text-lg text-gray-900">Remarque : Du fait de leur poids et vitesse supérieurs, les ebikes ont tendance à voir leurs composants et pneus s'user plus vite. Attendez-vous à réduire les intervalles entre les entretiens pour de meilleures performances. Partez donc plutôt sur des intervalles de 3 mois, plutôt que 6.</p>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default MaintenanceHero;
