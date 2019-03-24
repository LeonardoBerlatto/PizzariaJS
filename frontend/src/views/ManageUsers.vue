<template>
	<div class="user-list">
		<div class="table">
			<b-table
				@row-clicked="editUser"
				hover
				bordered
				:items="users"
				:fields="['name', 'email', 'userType']"
			/>
		</div>

		<div class="divider"></div>
	</div>
</template>

<script>
import { getAll } from '../services/user.js';

export default {
	data() {
		return {
			users: [],
			user: {
				name: "",
				email: null,
				userType: ""
			}
		}
	},
	methods: {
		editUser(item) {
			this.$router.push(`/users/${item.id}`);
		}
	},
	created() {
		getAll(this.$store.state.user.id)
			.then(res => this.users=res.data);
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

	.user-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		margin-top: 3.6rem;
		width: 100%;
		height: 100%;

		table {
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
		.add-user {
			display: flex;
			margin-bottom: 15px;
			width: 60%;
			justify-content: center;

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
</style>
