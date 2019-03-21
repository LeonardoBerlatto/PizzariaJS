<template>
	<div class="flavor-list">
		<div
			v-for="franchise in franchises"
			:key="franchise.id"
			class="franchise-container"
		>
			<h1>{{ franchise.name }}</h1>
			<b-table
				@row-clicked="editFlavor"
				hover
				:items="flavors"
				:fields="['name']"
				bordered
			/>
			<div class="divider"></div>
		</div>
	</div>
</template>


<script>
import { getFranchisesFromUser } from '../services/franchises.js';
import { getFlavorsFromUserFranchise } from '../services/flavors.js';


export default {
	data() {
		return {
			flavors: [],
			franchises: []
		}
	},
	methods: {
		editFlavor(item) {
			this.$router.push(`/flavors/${item.id}`);
		}
	},
	created() {
		getFlavorsFromUserFranchise(this.$store.state.user.id)
			.then(res => this.flavors=res.data);
		getFranchisesFromUser(this.$store.state.user.id)
			.then(res => this.franchises=res.data);
	}

}
</script>

<style lang="scss">
	$main-green: #41b883;

	.flavor-list {
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

			.divider {
				width: 100%;
				height: 2px;
				background-color: $main-green;
			}
		}
	}
</style>
