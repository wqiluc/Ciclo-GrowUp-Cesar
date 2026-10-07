# pip install crewai yfinance python-dotenv
import yfinance as yf
from crewai import LLM, Agent, Crew, Task
from crewai.tools import tool
from dotenv import load_dotenv

load_dotenv()

llm = LLM(model="gpt-4o-mini", temperature=0.2)


@tool("Histórico de preço da ação")
def stock_price(ticker: str) -> str:
    """Retorna o resumo dos últimos 3 meses de um ticker da bolsa (ex.: AAPL, MSFT, PETR4.SA):
    último fechamento, variação, máxima, mínima, médias móveis e os últimos 10 fechamentos."""
    hist = yf.Ticker(ticker.strip().upper()).history(period="3mo")
    if hist.empty:
        return f"Sem dados para {ticker}. Confira o ticker (B3 usa sufixo .SA)."

    close = hist["Close"]
    return (
        f"{ticker} | último fechamento: {close.iloc[-1]:.2f}\n"
        f"variação 3 meses: {(close.iloc[-1] / close.iloc[0] - 1) * 100:+.2f}%\n"
        f"variação 1 mês: {(close.iloc[-1] / close.iloc[-21] - 1) * 100:+.2f}%\n"
        f"máxima: {hist['High'].max():.2f} | mínima: {hist['Low'].min():.2f}\n"
        f"média móvel 20d: {close.tail(20).mean():.2f} | 50d: {close.tail(50).mean():.2f}\n"
        f"últimos fechamentos:\n{close.tail(10).round(2).to_string()}"
    )


price_analyst = Agent(
    role="Price Analyst",
    goal="Analisar o comportamento de preço das ações {acoes} e identificar tendências",
    backstory="Analista técnico experiente. Baseia tudo em dados, nunca em achismo.",
    tools=[stock_price],
    llm=llm,
    verbose=True,
)

price_task = Task(
    description=(
        "Para cada ticker em {acoes}, use a tool de preço e analise tendência, "
        "volatilidade e momento (preço x médias móveis)."
    ),
    expected_output=(
        "Por ticker: preço atual, variação no período, tendência (alta/baixa/lateral) e 2-3 observações."
    ),
    agent=price_analyst,
)

if __name__ == "__main__":
    print(stock_price.run(ticker="AAPL"))
    crew = Crew(agents=[price_analyst], tasks=[price_task])
    print(crew.kickoff(inputs={"acoes": "AAPL"}).raw)
