<template>
  <a-table
    :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectedRows}"
    :rowKey="rowKey"
    :columns="columns"
    :data-source="dataSource.data"
    :pagination="pagination"
    :loading="loading"
  >
    <template  v-for="column in columns"  :slot="column.scopedSlots?column.scopedSlots.customRender:''" slot-scope="text,record" >
					<slot :name="column.scopedSlots?column.scopedSlots.customRender:''" v-bind="record" ></slot>
				</template>
  </a-table>
</template>

<script>
export default {
  name: "PaginationTable",
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
      required: true
    },
    dataSource: {
      type: Object,
      default() {
        return {
          data: [],
          totalCount: 0,
          currentPage: 1,
          pageSize: 10
        };
      },
      required: true
    },
    rowKey: {
      type: [String, Function],
      default() {
        return record => record.id;
      }
    }
  },
  data() {
    return {
      selectedRowKeys: [],
      pagination: {
        size: "small", //尺寸
        total: 0, //数据总数
        current: 1, //默认当前页数
        pageSize: 10, // 默认每页显示数量
        showQuickJumper: true, //快速跳转至某页
        showSizeChanger: true, // 显示可改变每页数量
        // hideOnSinglePage: true, //只有一页时隐藏分页器
        showTotal: total => `共 ${total} 条数据`, // 显示总数
        onShowSizeChange: (current, pageSize) =>
          this.onPaginationChange(current, pageSize), // 改变每页数量时更新显示
        onChange: (page, pageSize) => this.onPaginationChange(page, pageSize),
        pageSizeOptions: ["10", "20", "50", "100"] // 每页数量选项
      }
    };
  },
  methods: {
    onSelectedRows(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      //   console.log(selectedRowKeys);
      this.$emit("selected", this.selectedRowKeys);
    },
    onPaginationChange(current, pageSize) {
      const pagination = { ...this.pagination };
      pagination.current = current;
      pagination.pageSize = pageSize;
      this.pagination = pagination;
      this.$emit("change", { page: current, size: pageSize });
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {
    dataSource(val) {
      const pagination = { ...this.pagination };
      pagination.total = val.totalCount;
      pagination.current = val.currentPage;
      pagination.pageSize = val.pageSize;
      this.pagination = pagination;
    }
  }
};
</script>