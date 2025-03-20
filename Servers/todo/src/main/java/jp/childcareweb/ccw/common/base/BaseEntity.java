package jp.childcareweb.ccw.common.base;

import java.time.LocalDateTime;

/**
 * Entityのベースインターフェース
 */
public interface BaseEntity {

    /** データ登録時の並び順の増分 */
    public static final int SORT_ORDER_INCREMENT = 10;

    /** 並び順の限界値 */
    public static final int SORT_ORDER_LIMIT = 999_999;

    /**
     * IDを取得します。
     * @return ID
     */
    public Long getId();

    /**
     * IDをセットします。
     * @param id ID
     */
    public void setId(Long id);

    /**
     * 登録日時を取得します。
     * @return 登録日時
     */
    public LocalDateTime getCreatedAt();

    /**
     * 登録日時をセットします。
     * @param createdAt 登録日時
     */
    public void setCreatedAt(LocalDateTime createdAt);

    /**
     * 更新日時を取得します。
     * @return 更新日時
     */
    public LocalDateTime getUpdatedAt();

    /**
     * 更新日時をセットします。
     * @param updatedAt 更新日時
     */
    public void setUpdatedAt(LocalDateTime updatedAt);

    /**
     * 並び順から次に登録するべき並び順を生成します。
     * @param sortOrder 並び順
     * @return 次の並び順
     */
    public static int generateNextSortOrder(Integer sortOrder) {
        return Math.min(sortOrder + SORT_ORDER_INCREMENT, SORT_ORDER_LIMIT);
    }
}
