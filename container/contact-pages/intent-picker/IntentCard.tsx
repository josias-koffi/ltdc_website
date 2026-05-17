"use client";
import React from "react";
import { motion } from "framer-motion";
import { Box, Card, CardActionArea, Typography } from "@mui/material";
import Link from "next/link";
import {
  IconHelpCircle,
  IconBuildingCommunity,
  IconHeartHandshake,
  IconMail,
  IconArrowRight,
} from "@tabler/icons-react";
import { fadeInUp } from "@/components/animation/variants";
import type { Intent } from "./intents";

const iconMap = {
  help: IconHelpCircle,
  handshake: IconBuildingCommunity,
  heart: IconHeartHandshake,
  mail: IconMail,
} as const;

const IntentCard = ({ intent }: { intent: Intent }) => {
  const Icon = iconMap[intent.icon];
  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
      <Card
        elevation={2}
        sx={{
          borderRadius: 3,
          height: "100%",
          transition: "box-shadow 0.25s ease",
          "&:hover": { boxShadow: 6 },
        }}
      >
        <CardActionArea
          component={Link}
          href={intent.href}
          sx={{ p: 3, height: "100%", display: "flex", alignItems: "flex-start", gap: 2 }}
        >
          <Box
            sx={{
              backgroundColor: "primary.main",
              color: "#fff",
              borderRadius: 2,
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={28} stroke={1.8} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography variant="h6" fontWeight={700} color="primary.main">
                {intent.label}
              </Typography>
              <IconArrowRight size={20} />
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
              {intent.description}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

export default IntentCard;
