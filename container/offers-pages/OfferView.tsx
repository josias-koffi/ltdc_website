"use client";
import React from "react";
import { OfferEntity } from "@/libs/interfaces/entities";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { Typography, Box } from "@mui/material";
import Link from "next/link";

const OfferView = ({ offer }: { offer: OfferEntity }) => {
  return (
    <ContainerWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          gap: 1,
          pt: 0,
        }}
      >
        <Typography variant="h3" color={"primary"}>
          {`Offre de Poste : ${offer?.name}`}
        </Typography>
        <Typography variant="h4" color={"secondary"}>
          {`À Propos de LTDC`}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {`🌟 L'association "Les travailleurs du cœur" (LTDC) s'engage à accompagner les personnes en situation irrégulière dans leur parcours de formation, d'emploi et de logement. Nous croyons en un monde où chacun mérite une chance égale de s'épanouir et de bâtir un avenirmeilleur.🌟`}
        </Typography>
        <Typography variant="h4" color={"secondary"}>
          {`Nos Valeurs`}
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Solidarité</strong> 🤝🏼: Nous œuvrons ensemble pour
              soutenir les plus vulnérables.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Engagement</strong> 🔥: Chaque membre de notre association
              est dévoué à la cause et à nos bénéficiaires.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Respect</strong> 🕊: Nous traitons chaque personne avec
              dignité et considération.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Inclusion</strong> 🌍: Nous croyons en une société
              inclusive où chacun trouve sa place.
            </Typography>
          </li>
        </ul>
        <Typography variant="h4" color={"secondary"}>
          {`Description du Poste`}
        </Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: offer?.description }}
        />
        <Typography variant="h4" color={"secondary"}>
          {`Responsabilités`}
        </Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: offer?.responsabilities }}
        />
        <Typography variant="h4" color={"secondary"}>
          {`Profil Recherché`}
        </Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: offer?.profile }}
        />
        <Typography variant="h4" color={"secondary"}>
          {`Pourquoi Nous Rejoindre ?`}
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Faites une Différence</strong> 🌟: Votre contribution aura
              un impact direct sur la vie des personnes en situation
              irrégulière.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Rejoignez une Communauté Engagée</strong> 🌍: Vous ferez
              partie d'une équipe soudée et motivée par des valeurs humaines
              fortes.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Développez vos Compétences</strong> 💼: Vous aurez
              l'opportunité de renforcer vos compétences en communication et en
              gestion de communauté.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Expériences Enrichissantes</strong> 🌈: Vivez des
              expériences humaines uniques et inspirantes en participant à de
              <strong>beaux projets en cours et à venir</strong>.
            </Typography>
          </li>
        </ul>
        <Typography variant="h4" color={"secondary"}>
          {`Comment Postuler ?`}
        </Typography>
        <Typography>
          {`Envoyez votre CV et une lettre de motivation à`}{" "}
          <Link href={"mailto:recrutement@asso-ltdc.org"}>
            recrutement@asso-ltdc.org
          </Link>{" "}
          {`. Nous serions ravis de vous accueillir au sein de notre association et de travailler ensemble pour créer un avenir meilleur pour tous.`}
        </Typography>
        <Typography>
          {`Nous avons hâte de découvrir vos talents et de faire équipe avec vous pour continuer à bâtir une communauté solidaire et inclusive. "Mettons du cœur à l'ouvrage" et faisons la différence ensemble ! ❤️`}
        </Typography>
      </Box>
    </ContainerWrapper>
  );
};

export default OfferView;
