<template>
	<div class="movie-list">
		<section class="movie__section">
			<div class="movie__header">
				<h2 class="movie__title">
					<span>{{listType.toUpperCase()}} LIST</span>
				</h2>

				<div class="movie__filter">
					<ul class="movie__filter__box">
						<li class="movie__filter__list">
							<label class="movie__filter__label">
								<input type="radio" class="blind" name="popularFilter" value="popularity.desc" v-model="sortBy">
								<span>인기도순</span>
							</label>
						</li>

						<li class="movie__filter__list">
							<label class="movie__filter__label">
								<input type="radio" class="blind" name="popularFilter" value="vote_average.desc" v-model="sortBy">
								<span>평점순</span>
							</label>
						</li>

						<li class="movie__filter__list">
							<label class="movie__filter__label">
								<input type="radio" class="blind" name="popularFilter" value="title.desc" v-model="sortBy">
								<span>타이틀순</span>
							</label>
						</li>
					</ul>
				</div>
			</div>

			<ListItemComponent :itemData="itemList" :loading="loading.itemListLoading" />

			<paginationComponent :pagination="paginations" :disabled="loading.itemListLoading" v-if="itemList && itemList.length" ref="pagination" @movePage="test($event);" />
		</section>
	</div>
</template>

<script>
import ListItemComponent from "@/components/ListItemComponent.vue";
import paginationComponent from "@/components/paginationComponent.vue";

export default {
	name: 'MovieList',
	components: {
		ListItemComponent,
		paginationComponent
	},
	data() {
		return {
			listType: "movie",
			loading: {
        itemListLoading: false,
      },
			parameters: {
				itemListParam: {
					language: "ko",
					page: 1,
					sort_by: "popularity.desc"
				}
			},
			itemList: [],
			sortBy: "popularity.desc",
			paginations: {
				id: "itemList",
				current: 1,
				rowCount: 10,
				listLength: 20,
				total: 0,
			},
			alert: {
				isOpen: true,
				msg: ""
			}
		}
	},
	created() {
		console.log(this.$route)
		this.listType = this.$route.params.id;
		// this.requestitemList();
	},
	mounted() {
		// this.requestitemList();
	},
	watch: {
    $route(to, from) {
			console.log(123)
			// this.listType = to.query.type;
			// this.loading.itemListLoading = false;
			// this.requestitemList();
    },
		"sortBy": {
			handler(newValue, oldValue) {
				this.loading.itemListLoading = false;
				this.parameters.itemListParam.sort_by = newValue;
				this.requestitemList();
			}
		}
	},
	methods: {
		async requestitemList() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/discover/${this.listType}`,
					data: this.parameters.itemListParam
				});

				if (response.data && response.data.results && response.data.results.length) {
					this.loading.itemListLoading = true;
					this.itemList = response.data.results;
					this.paginations.total = response.data.total_results;
				}
				else {
					this.itemList = [];
				}

				this.$nextTick(function() {
					this.$refs.pagination.pageInit();
				});
			}
			catch(e) {
				this.loading.itemListLoading = "error";
				console.error("error", e);
			}
		},
		test(payload) {
			const {id, pageNumber} = payload;

			this.loading.itemListLoading = false;
			this.parameters.itemListParam.page = pageNumber;
			this.paginations.current = pageNumber;
			this.requestitemList();
		}
	}
}
</script>

<style lang="scss" scope>
</style>