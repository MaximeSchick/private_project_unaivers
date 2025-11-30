// src/pages/home/section-content.jsx
import SectionShell from "../../components/ui/content/section-shell";
import SectionHeader from "../../components/ui/content/section-header";
import MetricCard from "../../components/ui/content/metric-card";
import MediaPlaceholder from "../../components/ui/content/media-placeholder";
import ContentButton from "../../components/ui/content/content-button";
import ContentPill from "../../components/ui/content/content-pill";
import AccentLine from "../../components/ui/content/accent-line";

export default function SectionContent() {
  return (
    <>
      <SectionShell tone="mist">
        <div className="content-grid-two items-center gap-12">
          <div className="flex flex-col gap-6">
            <ContentPill>Swiss Made • IA autonome</ContentPill>
            <SectionHeader
              alignment="left"
              title="Prospecter pendant votre sommeil."
              description="UNAIVERS détecte, contacte et confirme vos rendez-vous. Hébergée en Suisse, neutre en carbone, sous votre marque."
            />
            <AccentLine className="self-center" />
            <p className="content-lead text-neutral-600">
              L'agent construit ses listes, parle à vos prospects et cale les créneaux. Vous ne traitez que les contacts chauds.
            </p>
            <div className="flex flex-wrap gap-3">
              <ContentButton variant="accent">
                <i className="fa-solid fa-rocket text-sm" aria-hidden />
                Voir la démo
              </ContentButton>
              <ContentButton variant="ghost">
                <i className="fa-regular fa-calendar-check text-sm" aria-hidden />
                Parler à un expert
              </ContentButton>
            </div>
          </div>
          <MediaPlaceholder aspectRatio="3 / 4" label="Interface UNAIVERS (placeholder)" />
        </div>
        <div className="grid w-full gap-4 sm:grid-cols-3">
          <MetricCard
            label="100% Suisse"
            iconClass="fa-solid fa-shield-halved"
            value="Local"
            detail="Infra et données confinées en Suisse."
            className="items-center text-center"
          />
          <MetricCard
            label="100% IA"
            iconClass="fa-solid fa-robot"
            value="24/7"
            detail="Séquences agentiques sans pause."
            className="items-center text-center"
          />
          <MetricCard
            label="100% Vert"
            iconClass="fa-solid fa-leaf"
            value="Compensé"
            detail="Empreinte calculée et neutralisée."
            className="items-center text-center"
          />
        </div>
      </SectionShell>

      <SectionShell tone="plain">
        <div className="flex flex-col gap-10 items-center text-center">
          <SectionHeader
            eyebrow="Swiss made"
            title="Prête à chasser vos cibles."
            description="Un brief clair, l'IA s'occupe du reste."
          />
          <AccentLine className="self-center" />
          <div className="grid gap-8 md:grid-cols-3 w-full">
            <MetricCard
              label="Listes"
              iconClass="fa-solid fa-list-check"
              value="ICP → comptes"
              detail="Ciblage propre, exclusions, secteurs prioritaires."
              className="items-center text-center"
            />
            <MetricCard
              label="Messages"
              iconClass="fa-solid fa-paper-plane"
              value="Email + LinkedIn"
              detail="Ton adapté à votre marque, relances intelligentes."
              className="items-center text-center"
            />
            <MetricCard
              label="Rendez-vous"
              iconClass="fa-regular fa-calendar-check"
              value="Agenda"
              detail="Propose des créneaux, confirme, remet au commercial."
              className="items-center text-center"
            />
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="mist">
        <div className="flex flex-col gap-8 items-center text-center">
          <SectionHeader
            eyebrow="Fonctionnement agentique"
            title="Ciblage. Contact. Relance. Rendez-vous."
            description="Un flux unique qui s'ajuste automatiquement."
          />
          <AccentLine className="self-center" />
          <MediaPlaceholder aspectRatio="21 / 9" label="Timeline agentique" />
        </div>
      </SectionShell>

      <SectionShell tone="plain">
        <div className="grid gap-10 items-center lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-5">
            <SectionHeader
              alignment="left"
              eyebrow="Pilotage sobre"
              title="Votre marque, son ton."
              description="Fixez les règles, l'IA applique. Rien de plus."
            />
            <p className="content-lead text-neutral-600">
              Secteurs, personae, exclusions, ton : définissez et laissez tourner. Les relances se calent sur les réponses.
            </p>
            <ul className="grid gap-2 text-neutral-600 text-base leading-relaxed">
              <li>Personas et secteurs définis en clair.</li>
              <li>Variantes de messages testées automatiquement.</li>
              <li>Agenda synchronisé, créneaux proposés et confirmés.</li>
            </ul>
          </div>
          <MediaPlaceholder
            aspectRatio="4 / 5"
            label="Dashboard pipeline / KPI à intégrer"
            className="w-full"
          />
        </div>
      </SectionShell>

      <SectionShell tone="plain">
        <div className="flex flex-col items-center gap-5 text-center">
          <SectionHeader
            title="Déployer l'IA en quelques jours."
            description="Passez du brief aux premiers rendez-vous sans écrire de code."
          />
          <div className="flex flex-wrap justify-center gap-3">
            <ContentButton variant="accent">
              <i className="fa-solid fa-play text-sm" aria-hidden />
              Activer un essai
            </ContentButton>
            <ContentButton variant="ghost">
              <i className="fa-regular fa-file-lines text-sm" aria-hidden />
              Recevoir la fiche technique
            </ContentButton>
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="mist">
        <div className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="Bilan carbone"
            title="Infomaniak + forêt : notre empreinte sous contrôle."
            description="Données hébergées et servies par Infomaniak en Suisse, compensation intégrée et transparence totale."
          />
          <AccentLine className="self-center" />
          <div className="grid gap-6 md:grid-cols-3">
            <MediaPlaceholder aspectRatio="4 / 5" label="Data centers Infomaniak" />
            <MediaPlaceholder aspectRatio="4 / 5" label="Forêts partenaires (placeholder)" />
            <MediaPlaceholder aspectRatio="4 / 5" label="Suivi carbone exportable" />
          </div>
          <div className="grid gap-3 text-neutral-700 text-base leading-relaxed">
            <p className="font-semibold text-neutral-900">
              🌿 Hébergement durable, 100 % suisse — avec Infomaniak
            </p>
            <p className="content-lead text-neutral-600">
              Toutes nos données sont hébergées en Suisse par Infomaniak, l’entreprise reconnue pour son infrastructure écoresponsable,
              alimentée à 100 % en énergies renouvelables et compensée à 200 %.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-700">
              <li>Hébergement en Suisse, chez un acteur engagé.</li>
              <li>100 % d’énergie renouvelable pour faire tourner la plateforme.</li>
              <li>200 % de compensation des émissions de CO₂.</li>
              <li>Chaleur des data centers valorisée pour chauffer des bâtiments.</li>
              <li>Engagements publics, publiés et vérifiables.</li>
            </ul>
            <p className="content-lead text-neutral-600">
              Des visuels de forêts seront intégrés ici pour illustrer la dimension écologique de l’infrastructure.
            </p>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
