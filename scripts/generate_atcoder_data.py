import requests
import json
from datetime import datetime

# ===== 設定値 =====
USERNAME = "Y_Maekawa"
GOAL = 1200
OUTPUT_PATH = "data/atcoder-rating.json"

print("=== AtCoder Rating Data Generator ===")
print(f"ユーザー名: {USERNAME}")
print(f"目標レーティング: {GOAL}")
print("")

def get_latest_rating(contest_type):
    """指定されたコンテストタイプの最新レーティングとパフォーマンスを取得"""
    print(f"🔍 {contest_type.capitalize()} レーティング取得中...")
    
    try:
        url = f"https://atcoder.jp/users/{USERNAME}/history/json?contestType={contest_type}"
        response = requests.get(url, timeout=10)
        
        if response.status_code != 200:
            print(f"   ❌ APIエラー: {response.status_code}")
            return None
        
        data = response.json()
        
        if not data:
            print(f"   ⚠️ コンテスト履歴が見つかりません")
            return None
        
        latest = data[-1]
        rating = latest["NewRating"]
        highest = max(item["NewRating"] for item in data)
        
        # 最高パフォーマンスを取得
        highest_performance = max(item.get("Performance", 0) for item in data)
        
        print(f"   ✅ 現在: {rating}, 最高レート: {highest}, 最高パフォーマンス: {highest_performance}")
        
        return {
            "current": rating,
            "highest": highest,
            "highest_performance": highest_performance,
            "contests": len(data),
            "rank": latest.get("Place", "-")
        }
        
    except Exception as e:
        print(f"   ❌ エラー: {e}")
        return None

def main():
    print("📊 レーティングデータ取得開始\n")
    
    # Algorithm部門
    algo_data = get_latest_rating("algorithm")
    print("")
    
    # Heuristic部門
    heur_data = get_latest_rating("heuristic")
    print("")
    
    # フォールバックデータ
    if not algo_data:
        algo_data = {"current": 271, "highest": 288, "highest_performance": ---, "contests": 20, "rank": "-"}
        print("⚠️ Algorithm部門はフォールバックデータを使用")
    
    if not heur_data:
        heur_data = {"current": 1241, "highest": 1247, "highest_performance": ---, "contests": 5, "rank": "-"}
        print("⚠️ Heuristic部門はフォールバックデータを使用")
    
    # 残りポイント計算
    algo_remain = max(GOAL - algo_data["current"], 0)
    heur_remain = max(GOAL - heur_data["current"], 0)
    
    # JSONデータ作成
    output_data = {
        "username": USERNAME,
        "goal": GOAL,
        "lastUpdated": datetime.utcnow().isoformat() + "Z",
        "algorithm": {
            "current": algo_data["current"],
            "highest": algo_data["highest"],
            "highestPerformance": algo_data.get("highest_performance", 0),
            "contests": algo_data["contests"],
            "rank": str(algo_data["rank"]),
            "remaining": algo_remain,
            "achieved": algo_remain == 0
        },
        "heuristic": {
            "current": heur_data["current"],
            "highest": heur_data["highest"],
            "highestPerformance": heur_data.get("highest_performance", 0),
            "contests": heur_data["contests"],
            "rank": str(heur_data["rank"]),
            "remaining": heur_remain,
            "achieved": heur_remain == 0
        }
    }
    
    # ファイル出力
    print(f"💾 JSONファイル出力: {OUTPUT_PATH}")
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    print("✅ 完了！")
    print(f"📊 結果:")
    print(f"   Algorithm: {algo_data['current']} (残り{algo_remain}pt) | 最高パフォ: {algo_data.get('highest_performance', 0)}")
    print(f"   Heuristic: {heur_data['current']} (残り{heur_remain}pt) | 最高パフォ: {heur_data.get('highest_performance', 0)}")

if __name__ == "__main__":
    main()
