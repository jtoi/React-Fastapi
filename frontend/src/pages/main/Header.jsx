// Header.js
import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faBox, faTruck, faChartBar, faExchangeAlt, faUtensils, faBars } from '@fortawesome/free-solid-svg-icons';
import { MenuItemWithSubmenu } from '../../components/menu/MenuItemWithSubmenu';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext'; // Importa el contexto
import '../../styles/header.css'; // Importa tus styles

export function Header() {
	const { username, menus, token, clearAuthData } = useContext(UserContext);
	const [isExpanded, setIsExpanded] = useState(false);
	const [activeMenu, setActiveMenu] = useState(null);
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsExpanded(!isExpanded);
	};

	const closeMenu = (e) => {
		if (isExpanded && !e.target.closest(".sidebar") && !e.target.closest(".menu-toggle")) {
			setIsExpanded(false);
			setActiveMenu(null);
		}
	};

	useEffect(() => {
		document.addEventListener("click", closeMenu);
		return () => {
			document.removeEventListener("click", closeMenu);
		};
	}, [isExpanded]);

	const toggleSubMenu = (menu) => {
		setActiveMenu(activeMenu === menu ? null : menu);
	};

	const handleSubMenuClick = () => {
		setIsExpanded(false);
		setActiveMenu(null);
	};

	const handleLogout = () => {
		clearAuthData();
		navigate('/login');
	}

	// Función para mapear los menús y submenús obtenidos del backend
	const renderMenus = () => {
		if (!menus) return null;
		return menus.map((menu) => {
			// Chequea si el menú tiene submenús
			if (menu.submenus && menu.submenus.length > 0) {
				return (
					<MenuItemWithSubmenu
						key={menu.id}
						menuKey={menu.id.toString()}
						activeMenu={activeMenu}
						toggleSubMenu={toggleSubMenu}
						menuIcon={<FontAwesomeIcon icon={getIcon(menu.icon)} />}
						menuText={menu.name}
						subMenuItems={menu.submenus.map((submenu) => ({
							text: submenu.name,
							url: submenu.url,
						}))}
						handleSubMenuClick={handleSubMenuClick}
					/>
				);
			}
			// Si el menú no tiene submenús, no se renderiza
			return null;
		});
	};

	// Función para obtener el ícono correspondiente según el nombre del menú
	const getIcon = (iconName) => {
		switch (iconName) {
			case "faHome":
				return faHome;
			case "faCog":
				return faCog;
			case "faBox":
				return faBox;
			case "faTruck":
				return faTruck;
			case "faChartBar":
				return faChartBar;
			case "faExchangeAlt":
				return faExchangeAlt;
			case "faUtensils":
				return faUtensils;
			default:
				return faBars;
		}
	};

	return (
		<div className="container mt-5">
			<button className="menu-toggle" onClick={toggleMenu}>
				<FontAwesomeIcon icon={faBars} />
			</button>

			<div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
				<div className="sidebar-header">
					<Link to="/" className="logout" title="Dashboard" alt="Dashboard" onClick={handleSubMenuClick}>
						<div className="sidebar-logo">Veascan</div>
					</Link>
					{token ? (
						<button onClick={handleLogout} className="logout" title="Logout" alt="Logout">
							<div className="sidebar-user">{username}</div>
						</button>
					) : (
						<Link to="/login" className="logout" title="Login" alt="Login" onClick={handleSubMenuClick}>
							<div className="sidebar-user">Login </div>
						</Link>
					)}
				</div>
				<ul className="sidebar-menu">
					{/* Renderiza el menú Dashboard manualmente */}
					<li className="menu-item">
						<Link to="/" className="menu-link" onClick={handleSubMenuClick}>
							<div className="menu-icon"><FontAwesomeIcon icon={faHome} /></div>
							<div className="menu-text">Dashboard</div>
						</Link>
					</li>
					{/* Renderiza los menús dinámicamente */}
					{renderMenus()}
				</ul>
			</div>
		</div>
	);
}