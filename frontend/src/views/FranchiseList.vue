<template>
	<div class="franchise-list">
		<div class="table">
			<b-table
				@row-clicked="editFranchise"
				hover
				:items="franchises"
				:fields="['name', 'shopsNumber', { 'user.name': 'User' }]"
			/>
		</div>
	</div>
</template>

<script>
import { getFranchisesFromUser } from '../services/franchises.js';

export default {
	data() {
		return {
			franchises: []
		}
	},
	methods: {
		editFranchise(item) {
			this.$router.push(`/franchise/${item.id}`);
		}
	},
	created() {
		getFranchisesFromUser(this.$store.state.user.id)
			.then(res => this.franchises=res.data);
	}
}
</script>

<style lang="scss">
	.franchise-list {
		background-color: #fff;
		margin-top: 3.6rem;
		width: 100%;
		height: 100%;

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
</style>
