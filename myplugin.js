// Plugin Name:		fo/Game
// Version:			1.0.0
// Date:			September 8, 2025
// Build for:		Future Ordering Sweden AB
// Description:		Creates a new menu item and a new page with a game to play online

export default async context => {
	console.log("Future Ordering Sweden AB");
	console.log("Plugin Name: fo/Game");
	console.log("Plugin Version: 1.0.0");
	
	// Creates the transform component for the new menu list item
	context.componentLoader.registerTransformComponent({
		location: 'popout-nav-menu-item',
		loadContent: (ctx, input) => {
			const currentMenuItems = input ?? [];
			return [
			{
				text: 'Online Game',
				icon: 'iconav van',
				destination: 'se/sv-se/pages/games',
			},
			...currentMenuItems,
			];
		},
	});
	
	// Creates the page component for the game page
	context.componentLoader.registerPageComponent({
		path: 'games',
		loadContent: async ctx => {
			const { page, shadow } = ctx;
			page.setTitle('Games');
			
			// Full-page flex container
			const container = document.createElement('div');
			container.style.width = "100%";
			container.style.height = "100%";
			container.style.display = "flex";
			container.style.justifyContent = "center";
			container.style.alignItems = "center";
			container.style.backgroundColor = "#000"; // optional background

			// Game iframe
			const iframe = document.createElement('iframe');
			iframe.src = "https://game.flarie.com/games/swace/95837863-35a1-46ee-9422-42b3fead940f";
			iframe.style.border = "none";

			// iPhone 12 Pro screen ratio (390x844)
			iframe.style.width = "390px";
			iframe.style.height = "844px";

			// Responsive scaling: shrink gracefully if screen smaller
			iframe.style.maxWidth = "100%";
			iframe.style.maxHeight = "100%";

			// Append iframe into container
			container.appendChild(iframe);

			// Attach to shadow DOM
			shadow.appendChild(container);
		},
	});
	
	// Creates block component with link to games page for quicker access
	context.componentLoader.registerBlockComponent({
		location: 'start-bottom',
		loadContent: async ctx => {
			const { shadow } = ctx;
			const container = document.createElement('div');

			container.style.display = 'flex';
			container.style.justifyContent = 'center';
			container.style.alignItems = 'center';
			container.style.flexDirection = 'column';
			container.style.width = '100%';
			container.style.padding = '12px 0';
			
			 // Create clickable button span
			const button = document.createElement('span');
			button.style.cursor = 'pointer';
			button.style.display = 'inline-flex';
			button.style.alignItems = 'center';
			button.style.gap = '8px'; // space between icon and text
			button.style.padding = '8px 16px';
			button.style.backgroundColor = '#f3f4f6'; // light gray
			button.style.border = '1px solid #d1d5db'; // subtle border
			button.style.borderRadius = '9999px'; // fully rounded sides
			button.style.fontSize = '15px';
			button.style.fontWeight = '600';
			button.style.color = '#111827'; // dark text
			button.style.transition = 'background-color 0.2s';
			
			// Hover effect
			button.addEventListener('mouseenter', () => {
				button.style.backgroundColor = '#e5e7eb'; // darker gray on hover
			});
			button.addEventListener('mouseleave', () => {
				button.style.backgroundColor = '#f3f4f6';
			});
			
			 // Icon element
			const icon = document.createElement('i');
			icon.className = 'iconav van';
			icon.setAttribute('aria-hidden', 'true');
			
			// Text node
			const text = document.createTextNode('Play Online Game');
	
			// Build the button content
			button.appendChild(icon);
			button.appendChild(text);

			// Click handler for navigation
			const targetUrl = 'https://demo-test.futureordering.com/se/sv-se/pages/games';
			button.addEventListener('click', () => {
				window.location.href = targetUrl;
			});

			// Add to container
			container.appendChild(button);
			shadow.appendChild(container);
		},
	});
};
