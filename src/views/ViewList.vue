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

			<ListItemComponent :listType="listType" :itemData="viewList" :loading="loading.viewListLoading" />

			<paginationComponent :pagination="paginations" :loading="loading.paginationLoading" v-if="viewList && viewList.length" ref="pagination" @movePage="pagingEvent($event);" />
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
        viewListLoading: false,
				paginationLoading: false,
      },
			parameters: {
				viewListParam: {
					language: "ko",
					page: 1,
					sort_by: "popularity.desc"
				}
			},
			viewList: [],
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
		this.listType = this.$route.params.type;
		this.requestViewList();
	},
	watch: {
    $route(to, from) {
			this.loading.itemListLoading = false;
			this.listType = to.params.type;

			this.sortBy = "popularity.desc";

			this.parameters.viewListParam = {
				language: "ko-KR",
				page: 1,
				sort_by: "popularity.desc"
			};

			this.paginations = {
				id: "viewList",
				current: 1,
				rowCount: 10,
				listLength: 20,
				total: 0,
			};

			this.requestViewList();
    },
		"sortBy": {
			handler(newValue, oldValue) {
				this.loading.viewListLoading = false;
				this.parameters.itemListParam.sort_by = newValue;
				this.requestViewList();
			}
		}
	},
	methods: {
		async requestViewList() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/discover/${this.listType}`,
					data: this.parameters.viewListParam
				});

				if (response.data && response.data.results && response.data.results.length) {
					this.loading.viewListLoading = true;
					this.loading.paginationLoading = true;
					this.viewList = response.data.results;
					this.paginations.total = response.data.total_results;
				}
				else {
					this.viewList = [];
				}

				this.$nextTick(function() {
					this.$refs.pagination.pageInit();
				});
			}
			catch(e) {
				this.loading.viewListLoading = "error";
				console.error("error", e);
			}
		},
		pagingEvent(payload) {
			const {id, pageNumber} = payload;

			this.loading.viewListLoading = false;
			this.loading.paginationLoading = false;
			this.parameters.viewListParam.page = pageNumber;
			this.paginations.current = pageNumber;
			this.requestViewList();
		}
	}
}
</script>

<style lang="scss" scope>
</style>