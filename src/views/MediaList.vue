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

			<ListItemComponent :listType="listType" :itemData="mediaList" :loading="loading.mediaListLoading" />

			<PaginationComponent :pagination="paginations" :loading="loading.paginationLoading" v-if="mediaList && mediaList.length" ref="pagination" @movePage="pagingEvent($event);" />
		</section>
	</div>
</template>

<script>
import ListItemComponent from "@/components/ListItemComponent.vue";

export default {
	name: 'MediaList',
	components: {
		ListItemComponent,
	},
	data() {
		return {
			listType: "movie",
			loading: {
        mediaListLoading: false,
				paginationLoading: false,
      },
			parameters: {
				mediaListParam: {
					language: "ko",
					page: 1,
					sort_by: "popularity.desc"
				}
			},
			mediaList: [],
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
		this.requestMediaList();
	},
	
	watch: {
    $route(newValue) {
			this.loading.mediaListLoading = false;
			this.listType = newValue.params.type;

			this.sortBy = "popularity.desc";

			this.parameters.mediaListParam = {
				language: "ko-KR",
				page: 1,
				sort_by: "popularity.desc"
			};

			this.paginations = {
				id: "mediaList",
				current: 1,
				rowCount: 10,
				listLength: 20,
				total: 0,
			};

			this.requestMediaList();
    },
		"sortBy": {
			handler(newValue, oldValue) {
				this.loading.mediaListLoading = false;
				this.parameters.mediaListParam.sort_by = newValue;
				this.requestMediaList();
			}
		}
	},
	
	methods: {
		async requestMediaList() {
			try {
				const response = await this.$store.dispatch("requestMethod", {
					method: "GET",
					url: `/discover/${this.listType}`,
					data: this.parameters.mediaListParam
				});

				if (response.data && response.data.results && response.data.results.length) {
					this.loading.mediaListLoading = true;
					this.loading.paginationLoading = true;
					this.mediaList = response.data.results;
					this.paginations.total = response.data.total_results;
				}
				else {
					this.mediaList = [];
				}

				this.$nextTick(function() {
					this.$refs.pagination.pageInit();
				});
			}
			catch(e) {
				this.loading.mediaListLoading = "error";
				console.error("error", e);
			}
		},
		pagingEvent(payload) {
			const {id, pageNumber} = payload;

			this.loading.mediaListLoading = false;
			this.loading.paginationLoading = false;
			this.parameters.mediaListParam.page = pageNumber;
			this.paginations.current = pageNumber;
			this.requestMediaList();
		}
	}
}
</script>

<style lang="scss" scope>
</style>