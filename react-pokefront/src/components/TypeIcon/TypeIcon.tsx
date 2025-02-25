import BugIcon from '../../assets/icons/Tipo_bicho_icono_EP.svg';
import DarkIcon from '../../assets/icons/Tipo_siniestro_icono_EP.svg';
import DragonIcon from '../../assets/icons/Tipo_dragon_icono_EP.svg';
import ElectricIcon from '../../assets/icons/Tipo_electrico_icono_EP.svg';
import FairyIcon from '../../assets/icons/Tipo_hada_icono_EP.svg';
import FightingIcon from '../../assets/icons/Tipo_lucha_icono_EP.svg';
import FireIcon from '../../assets/icons/Tipo_fuego_icono_EP.svg';
import FlyingIcon from '../../assets/icons/Tipo_volador_icono_EP.svg';
import GhostIcon from '../../assets/icons/Tipo_fantasma_icono_EP.svg';
import GrassIcon from '../../assets/icons/Tipo_planta_icono_EP.svg';
import GroundIcon from '../../assets/icons/Tipo_tierra_icono_EP.svg';
import IceIcon from '../../assets/icons/Tipo_hielo_icono_EP.svg';
import NormalIcon from '../../assets/icons/Tipo_normal_icono_EP.svg';
import PoisonIcon from '../../assets/icons/Tipo_veneno_icono_EP.svg';
import PsychicIcon from '../../assets/icons/Tipo_psiquico_icono_EP.svg';
import RockIcon from '../../assets/icons/Tipo_roca_icono_EP.svg';
import SteelIcon from '../../assets/icons/Tipo_acero_icono_EP.svg';
import WaterIcon from '../../assets/icons/Tipo_agua_icono_EP.svg';
import TypeIconProps from "./TypeIcon.types"

const typeIcons: { [key: string]: string } = {
    bug: BugIcon,
    dark: DarkIcon,
    dragon: DragonIcon,
    electric: ElectricIcon,
    fairy: FairyIcon,
    fighting: FightingIcon,
    fire: FireIcon,
    flying: FlyingIcon,
    ghost: GhostIcon,
    grass: GrassIcon,
    ground: GroundIcon,
    ice: IceIcon,
    normal: NormalIcon,
    poison: PoisonIcon,
    psychic: PsychicIcon,
    rock: RockIcon,
    steel: SteelIcon,
    water: WaterIcon,
};

const TypeIcon = ({ type }: TypeIconProps) => {
    const iconSrc = typeIcons[type.toLowerCase()];
    if (!iconSrc) return null; // Si no hay icono, no mostrar nada

    return (
        <img
            src={iconSrc}
            alt={type}
            className="w-6 h-6 inline-block border" // Ajusta el tamaño según necesites
            title={type} // Muestra el nombre del tipo al pasar el mouse
        />
    );
};

export default TypeIcon;
