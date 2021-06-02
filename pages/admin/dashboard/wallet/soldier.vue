<template>
	<div>
		<!-- Success Message -->
		<div :class="`alert ${successMessageClass}`" v-if="successMessage">
			{{ successMessage }}
		</div>
		<div class="table-responsive com-table">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th width="10%">No.</th>
						<th width="10%">Date</th>
						<th width="10%">Soldier</th>
						<th width="10%">Status</th>
						<th width="10%">Payment Method</th>
						<th width="15%">Amount</th>
						<th width="15%">Balance</th>
						<th width="15%">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="transaction in transactions.data" :key="transaction.id">
						<td>{{ transaction.transNumber || 'Not Available' }}</td>
						<td>{{ transaction.updated_at || 'Not Available' }}</td>
						<td > <span v-if="transaction.soldier"> {{ transaction.soldier.username }} </span> </td>

						<td>
							<span
								class="label"
								:class="{
									'label-info': transaction.status == 'pending',
									'label-success': transaction.status == 'done',
									'label-danger': transaction.status == 'canceled',
								}"
								>{{ transaction.status }}</span
							>
						</td>
						<td > <span v-if="transaction.soldier"> {{ transaction.soldier.fav_payment_method }} </span> </td>

						<td>
							<strong>{{ transaction.amount }}</strong>
						</td>
						<td>
							<strong>{{ transaction.balance }}</strong>
						</td>
						<td>
							<button
								title="cancel transaction"
								class="fa fa-times fa-lg btn btn-danger action-btn"
								@click="cancelTrans(transaction)"
								v-if="transaction.status == 'pending'"
							></button>
							<button
								title="done transactions"
								class="fa fa-check fa-lg btn btn-success action-btn"
								@click="showModal(transaction)"
								v-if="transaction.status != 'done'"
								
							></button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- pagination -->
		<pagination :links="transactions.links" @changePage="fetchData" />

		<!-- Modal to change status -->
		<div class="modal" tabindex="-1" v-if="currentTransaction" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" id="openTransactionModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Transaction</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="row">
				<br>
				<div class="col-sm-12 mt-4">
					<div class="form-group">
						<label class="col-sm-4">current balance: </label>
						<div class="col-sm-8">
							<span>{{currentTransaction.soldier.balance}} Riyal</span>
						</div>
					</div>
				</div>
				<div class="col-sm-12">
					<div class="form-group">
						<label class="col-sm-4">transaction number: </label>
						<div class="col-sm-8">
							<input type="number" class="form-control" v-model="transNumber" required />
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">cancel</button>
				<button type="button" class="btn btn-success" @click="transDone()">save transaction</button>
			</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import Pagination from '@/components/dashboard/table/pagination'

	export default {
		layout: 'dashboard',

		data: () => ({
			transactions: [],
			successMessage: '',
			successMessageClass: '',
			currentTransaction: null,
			transNumber: null
		}),
		async asyncData({ app }) {
			let response = await app.$axios.$get('soldier/transactions')
			console.log(response.data);
			return {
				transactions: response.data,
			}
		},
		watch: {
			successMessage(val) {
				setTimeout(() => {
					this.successMessage = ''
				}, 2500)
			},
		},

		mounted() {
			// this.getTrans()
			// console.log(this.transactions);
			$('#openTransactionModal').modal('hide');
		},

		components: {
			Pagination,
		},

		methods: {
			getTrans() {
				this.$axios
					.$get('soldier/transactions')
					.then((res) => {
						console.log(res.data.data);
						this.transactions = res.data.data
						this.transactions.done = this.filterTransactions(res, 'done')
						this.transactions.pending = this.filterTransactions(res, 'pending')
						this.transactions.canceled = this.filterTransactions(
							res,
							'canceled'
						)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			filterTransactions(response, status) {
				let transactions = response.data.data.filter(
					(transaction) => transaction.status == status
				)
				let transactionsSum = transactions.reduce(
					(total, transaction) => total + transaction.amount,
					0
				)

				return transactionsSum
			},
			showModal (transaction) {
				this.transNumber = null
				this.currentTransaction = transaction
				$('#openTransactionModal').modal('show');
			},
			transDone() {
				this.$axios
					.$post(`soldier/transactions/${this.currentTransaction.id}/done`, {
						transNumber: this.transNumber,
					})
					.then((res) => {
						this.successMessage = res.data.message
						let indexItem = this.transactions.data.findIndex((item) => item.id == res.data.data.id)
						this.transactions.data.splice(indexItem, 1, res.data.data)
						debugger
						$('#openTransactionModal').modal('hide');
					})
					.catch((err) => {
						if (err.errors)
							alert(err.errors.transNumber[0])
						else if(err.data) {
							alert(err.data.message)
						}
					})
			},
			cancelTrans(trans) {
				this.$axios
					.$post(`soldier/transactions/${trans.id}/cancel`)
					.then((res) => {
						this.successMessage = res.data.message
						let indexItem = this.transactions.data.findIndex((item) => item.id == res.data.data.id)
						this.transactions.data.splice(indexItem, 1, res.data.data)
						debugger
					})
					.catch((err) => {
						console.log(err)
					})
			},
			fetchData(value) {
				debugger
				this.transactions = value
			},
		},
	}
</script>
