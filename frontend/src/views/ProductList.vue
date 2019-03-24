<template>
	<div class="product-list">
		<div
			v-for="franchise in franchises"
			:key="franchise.id"
			class="franchise-container"
		>
			<h1>{{ franchise.name }}</h1>
			<b-table
				@row-clicked="editProduct"
				hover
				:items="franchise.products"
				:fields="['name', 'type', 'defaultPrice']"
				bordered
			/>

			<div class="add-product">
				<input
					type="text"
					v-model="product.name"
					name="product name"
					placeholder="Name"
				/>
				<input
					type="text"
					v-model="product.type"
					name="product type"
					placeholder="Type"
				/>
				<input
					type="text"
					v-model="product.defaultPrice"
					name="product price"
					placeholder="Default Price"
				/>
				<b-button
					@click="addProduct(product, franchise.id)"
					class="btn-add"
					variant="success"
					size="lg"
					show
					>+</b-button
				>
			</div>
			<div class="divider"></div>
		</div>
	</div>
</template>


<script>
import { getFranchisesFromUser } from '../services/franchises.js';
import { createProduct } from '../services/products.js';

export default {
	data() {
		return {
			franchises: [],
			product: {
				name: "",
				type: "",
				defaultPrice: null
			},
			msg: "",
			error: null
		}
	},
	methods: {
		editProduct(item) {
			this.$router.push(`/products/${item.id}`);
		},
		addProduct(product, franchiseId) {
			createProduct(product, franchiseId)
				.then(res => {
					this.franchises.filter(frachise => {
						return frachise.id === res.data.franchiseId; 
					})[0].products.push(res.data)
				})
				.catch(error => console.log(error.response));
		}
	},
	created() {
		getFranchisesFromUser(this.$store.state.user.id)
			.then(res => this.franchises=res.data);
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

	.product-list {
		background-color: #fff;
		margin-top: 3.6rem;
		width: 100%;
		height: 100%;

		.franchise-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			h1 {
				color: $main-green;
			}

			table {
				width: 50%;
				thead {
					tr {
						user-select: none;
					}
				}

				tbody {
					tr {
						cursor: pointer;
					}
				}
			}

			.add-product {
				display: flex;
				margin-bottom: 15px;

				.btn-add {
					margin-bottom: 5px;
					border-radius: 50%;
				}

				input {
					border: none;
					outline: none;
					color: #212121;
					padding: 5px 2px 0 2px;
					font-size: 18px;
					border-bottom: 1px solid $secondary-green;
					margin-right: 10px;
					width: 100%;
					text-align: center;

					&:-webkit-autofill,
					&:-webkit-autofill:hover,
					&:-webkit-autofill:focus,
					&:-webkit-autofill:active {
						box-shadow: 0 0 0 30px white inset;
					}
				}
			}

			.divider {
				width: 100%;
				height: 2px;
				background-color: $main-green;
			}
		}
	}
</style>
