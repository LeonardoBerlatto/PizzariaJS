<template>
	<div class="update-flavor">
		<div class="editing" v-if="flavor">
			<h1 class="title">Update flavor data</h1>
			<input
				type="text"
				v-model="flavor.name"
				name="flavor name"
				placeholder="Name"
			/>
			<input
				type="text"
				v-model="flavor.type"
				name="flavor type"
				placeholder="Type"
			/>
			<input
				type="text"
				v-model="flavor.defaultPrice"
				name="flavor price"
				placeholder="Default Price"
			/>

			<div class="actions">
				<b-button
					@click="updateFlavor()"
					class="mr-2"
					variant="success"
					>Update</b-button
				>
				<b-button @click="deleteFlavor(flavor.id)" variant="danger"
					>Delete</b-button
				>
			</div>
		</div>
		<div v-else>
			<h1 class="sorry">Sorry, this flavor doesn't exists :(</h1>
		</div>
	</div>
</template>

<script>
import { getFlavorById, updateFlavor, deleteFlavor } from '../services/flavors.js'

export default {
	data() {
		return {
			flavor: null
		}
	},
	methods: {
		deleteFlavor() {
			deleteFlavor(this.flavor.id).then(() => this.$router.push('/flavors'));
		},
		updateFlavor() {
			updateFlavor(this.flavor.id, this.flavor).then(() => this.$router.push('/flavors'));
		}
	},
	created() {
		getFlavorById(this.$route.params.id).then(res => this.flavor=res.data);
	}
}
</script>

<style lang="scss">
	$main-green: #41b883;
	$secondary-green: #4fc08d;
	$ripple-green: #08903e;

	@mixin transition($property) {
		-webkit-transition: $property;
		transition: $property;
	}

	.update-flavor {
		margin-top: 3.6rem;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.sorry {
			color: #5f5f5f;
		}

		.editing {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.title {
				color: $main-green;
				margin-bottom: 20px;
			}

			input {
				border: none;
				outline: none;
				color: #212121;
				padding: 5px 2px 0 2px;
				font-size: 18px;
				background-color: transparent;
				border-bottom: 1px solid #a9a9a9;
				margin-bottom: 30px;
				width: 15%;
				min-width: 190px;
				max-width: 290px;
				text-align: center;
				@include transition((border-bottom, width 0.3s ease));
				&:focus {
					border-bottom: 1px solid #4fc08d;
					max-width: 290px;
					width: 25%;
				}
				&:-webkit-autofill,
				&:-webkit-autofill:hover,
				&:-webkit-autofill:focus,
				&:-webkit-autofill:active {
					box-shadow: 0 0 0 30px white inset;
				}
			}
		}
	}
</style>
