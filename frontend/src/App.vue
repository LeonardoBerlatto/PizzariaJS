<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
	#app {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
			Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		background-color: #fafafa;
	}
	#nav {
		padding: 30px;
		a {
			font-weight: bold;
			color: #2c3e50;
			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}

	* {
		box-sizing: border-box;
	}

	html,
	body {
		width: 100%;
		margin: 0;
		height: 100%;
	}
</style>
