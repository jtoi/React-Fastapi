import React from 'react';
import { Link } from 'react-router-dom';
import { SubMenuItem } from '../atoms/SubMenuItem'; // Importa el componente SubMenuItem

export const MenuItemWithSubmenu = ({
	menuKey,
	activeMenu,
	toggleSubMenu,
	menuIcon,
	menuText,
	subMenuItems,
	handleSubMenuClick
}) => {
	return (
		<li className={`menu-item ${activeMenu === menuKey ? "active" : ""}`}>
			<Link to="#" className="menu-link has-submenu" onClick={(e) => { e.preventDefault(); toggleSubMenu(menuKey); }}>
				<div className="menu-icon">{menuIcon}</div>
				<div className="menu-text">{menuText}</div>
			</Link>
			<ul className="submenu" style={{ display: activeMenu === menuKey ? "block" : "none" }}>
				{subMenuItems.map((item, index) => (
					<SubMenuItem
						key={index}
						text={item.text}
						url={item.url}
						onClick={handleSubMenuClick}
					/>
				))}
			</ul>
		</li>
	);
};