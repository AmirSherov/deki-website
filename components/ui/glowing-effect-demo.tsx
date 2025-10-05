"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffectAceternity } from "./glowing-effect-aceternity";
import "./glowing-cards.css";

export default function GlowingEffectDemo() {
  return (
    <div className="glowing-cards-container">
      <ul className="glowing-cards-grid">
        <GridItem
          icon={<Box className="glowing-card-icon" />}
          title="Do things the right way"
          description="Running out of copy so I'll write anything."
        />

        <GridItem
          icon={<Settings className="glowing-card-icon" />}
          title="The best AI code editor ever."
          description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
        />

        <GridItem
          icon={<Lock className="glowing-card-icon" />}
          title="You should buy Aceternity UI Pro"
          description="It's the best money you'll ever spend"
        />

        <GridItem
          icon={<Sparkles className="glowing-card-icon" />}
          title="This card is also built by Cursor"
          description="I'm not even kidding. Ask my mom if you don't believe me."
        />

        <GridItem
          icon={<Search className="glowing-card-icon" />}
          title="Coming soon on Aceternity UI"
          description="I'm writing the code as I record this, no shit."
        />
      </ul>
    </div>
  );
}

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const GridItem = ({ icon, title, description }: GridItemProps) => {
  return (
    <li className="glowing-card">
      <div className="glowing-card-container">
        <GlowingEffectAceternity
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
        />
        <div className="glowing-card-content">
          <div className="glowing-card-inner">
            <div className="glowing-card-icon-container">
              {icon}
            </div>
            <div className="glowing-card-text-container">
              <h3 className="glowing-card-title">
                {title}
              </h3>
              <p className="glowing-card-description">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
