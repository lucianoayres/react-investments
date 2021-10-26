export default function TopRankingDecoration( { ranking = 0 }) {

  const topRankingEmojis = ['🥇','🥈','🥉']

  let selectedRankingEmoji = null

  if (topRankingEmojis[ranking -1]){
    selectedRankingEmoji = topRankingEmojis[ranking -1]
  }

  return <span>{selectedRankingEmoji}</span>
}
