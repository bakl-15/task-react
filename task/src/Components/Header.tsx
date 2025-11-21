import React from "react";

const BG_IMAGE = "/mnt/data/A_promotional_digital_graphic_design_advertisement.png";

const Header: React.FC = () => (
  <header className="relative">
    <div
      className="h-56 bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url('${BG_IMAGE}')`, backgroundBlendMode: "overlay" }}
    >
      <div className="backdrop-brightness-50 w-full bg-gradient-to-r from-[#081022]/60 to-[#001022]/40 p-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
              Gestionnaire d'entreprises & Services IT
            </h1>
            <p className="mt-1 text-sm text-slate-200">
              Création/modification d'entreprise, préparation de dossiers administratifs, sites web Ar/Fr — prix compétitifs
            </p>
          </div>
          <div className="text-right text-sm">
            <div>📧 BAAKEL Sofiane</div>
            <div>📞 0759290094</div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
