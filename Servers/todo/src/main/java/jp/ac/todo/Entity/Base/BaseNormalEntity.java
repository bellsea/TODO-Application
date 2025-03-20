package jp.ac.todo.Entity.Base;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jp.childcareweb.ccw.common.base.BaseEntity;

/**
 * Entityのベースクラス
 */

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseNormalEntity implements Serializable, BaseEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;


    @CreatedDate
    @Column(name = "create_at", nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "update_at", nullable = false)
    private LocalDateTime updatedAt;


    /**
     * IDを取得します。
     * @return ID
     */
    @Override
    public Long getId() {
        return id;
    }

    /**
     * IDをセットします。
     * @param id ID
     */
    @Override
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 登録日時を取得します。
     * @return 登録日時
     */
    @Override
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * 登録日時をセットします。
     * @param createdAt 登録日時
     */
    @Override
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * 更新日時を取得します。
     * @return 更新日時
     */
    @Override
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    /**
     * 更新日時をセットします。
     * @param updatedAt 更新日時
     */
    @Override
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * 並び順から次に登録するべき並び順を生成します。
     * @param sortOrder 並び順
     * @return 次の並び順
     */
    public static int generateNextSortOrder(Integer sortOrder) {
        return BaseEntity.generateNextSortOrder(sortOrder);
    }

}