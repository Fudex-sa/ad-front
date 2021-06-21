<template>
	<div>
		<!-- Success Message -->
		<div :class="`alert ${successMessageClass}`" v-if="successMessage">
			{{ successMessage }}
		</div>
		<div class="table-responsive com-table">

			<client-only placeholder="Loading...">
      <v-client-table :data="transactions" :columns="columns" :options="options">
							

							  <template span slot="payment_id" slot-scope="props">          
										<span>{{(props.row.fav_payment_method=='paypal'? props.row.paypalno : props.row.stcpayno)}}</span>									
        </template>


        <template span slot="actions" slot-scope="props">          
											<button
												title="Pay soldier"
												class="fa fa-check fa-lg btn btn-success action-btn"
												@click="showModal(props.row)"
												v-if="props.row.balance != '0'"
												
											></button>
        </template>
      </v-client-table>
    </client-only>



			<!-- <table class="table table-bordered">
				<thead>
					<tr>
						<th width="10%">Soldier</th>
						<th width="10%">Payment method</th>
						<th width="10%">Payment ID</th>
						<th width="10%">Balance</th>						
						<th width="15%">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="transaction in transactions" :key="transaction.id">
						<td>{{ transaction.username }}</td>
						<td>{{ transaction.fav_payment_method }}</td>
						<td>111</td>
						<td>{{ transaction.balance }}</td>

						
						<td>
							
						
						</td>
					</tr>
				</tbody>
			</table> -->
		</div>
		<!-- pagination -->
		<pagination :links="transactions.links" @changePage="fetchData" />

		<!-- Modal to change status -->
		<div class="modal" tabindex="-1" v-if="currentTransaction" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" id="openTransactionModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Pay soldier</h5>
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
							<span>{{currentTransaction.balance}} Riyal</span>
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
			columns: ["username", "fav_payment_method", "balance", "payment_id","actions"],
			transactions: [],
			successMessage: '',
			successMessageClass: '',
			currentTransaction: null,
			transNumber: null,
			options: {
					headings: {						
							username: 'Soldier',
							fav_payment_method: 'Payment method',
							balance: 'Balance',
							payment_id: 'Payment ID',
							actions: 'Actions'
							
					},
					sortable: ["soldier", "fav_payment_method", "balance", "created_at"],
					filterable: ["soldier", "fav_payment_method", "balance", "created_at"]
			}
		}),
		async asyncData({ app }) {
			let response = await app.$axios.$get('soldiers')
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
					.$post(`soldier/pay`, {
						transNumber: this.transNumber,
						amount:this.currentTransaction.balance,
						soldier_id:this.currentTransaction.id
					})
					.then((res) => {
						this.successMessage = res.data.message;
						
						let indexItem = this.transactions.findIndex((item) => item.id == res.data.data.soldier_id);
						//this.transactions.splice(indexItem, 1, res.data.data)
						// update all transaction balance of this soldier
						this.transactions.forEach((element, index) => {
							if (element.id == res.data.data.soldier_id) {
								this.transactions[index].balance = 0;
							}
						});
						//debugger
						$('#openTransactionModal').modal('hide');
					})
					.catch((err) => {
						if (err.errors)
							alert(err.errors.transNumber[0])
						else {
							alert(err.message)
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
