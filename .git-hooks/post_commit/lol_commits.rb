module Overcommit::Hook::PostCommit
  class LolCommits < Base
    def run
      result = execute(['lolcommits', '-c', '--fork', '--stealth'])
      return :fail, result.stdout unless result.success?
      :pass
    end
  end
end
